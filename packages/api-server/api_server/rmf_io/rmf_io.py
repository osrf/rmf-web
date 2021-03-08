import asyncio
import base64
import hashlib
import logging
from typing import Dict, Optional, OrderedDict, cast

import socketio
from building_map_msgs.msg import AffineImage, BuildingMap, Level
from rmf_door_msgs.msg import DoorState
from rmf_lift_msgs.msg import LiftState
from rosidl_runtime_py.convert import message_to_ordereddict

from ..models import DoorHealth, LiftHealth
from ..repositories import StaticFilesRepository
from .authenticator import AuthenticationError, Authenticator, StubAuthenticator
from .gateway import RmfGateway
from .topics import topics


class RmfIO:
    def __init__(
        self,
        sio: socketio.AsyncServer,
        rmf_gateway: RmfGateway,
        static_files: StaticFilesRepository,
        *,
        logger: logging.Logger = None,
        loop: asyncio.AbstractEventLoop = None,
        authenticator: Authenticator = StubAuthenticator(),
    ):
        self.sio = sio
        self.rmf_gateway = rmf_gateway
        self.static_files = static_files
        self.logger = logger or sio.logger
        self.loop = loop or asyncio.get_event_loop()
        self.authenticator = authenticator
        self.room_records = {}

        self.sio.on("connect", self._on_connect)
        self.sio.on("disconnect", self._on_disconnect)
        self.sio.on("subscribe", self._on_subscribe)

        self._init_door_state()
        self._init_door_health()
        self._init_lift_state()
        self._init_lift_health()
        self._init_building_map()

    def _init_door_state(self):
        records = cast(Dict[str, OrderedDict], {})
        self.room_records[topics.door_states] = records

        def on_next(state: DoorState):
            dic = message_to_ordereddict(state)
            records[state.door_name] = dic

            async def emit_task():
                await self.sio.emit(topics.door_states, dic, to=topics.door_states)
                self.logger.debug(f'emitted message to room "{topics.door_states}"')

            self.loop.create_task(emit_task())

        self.rmf_gateway.door_states.subscribe(on_next)

    def _init_door_health(self):
        records = cast(Dict[str, OrderedDict], {})
        self.room_records[topics.door_health] = records

        def on_next(health: DoorHealth):
            health_dict = health.to_dict()
            records[health.name] = health_dict

            async def emit_task():
                await self.sio.emit(
                    topics.door_health, health_dict, to=topics.door_health
                )
                self.logger.debug(f'emitted message to room "{topics.door_health}"')

            self.loop.create_task(emit_task())

        self.rmf_gateway.door_health.subscribe(on_next)

    def _init_lift_state(self):
        records = cast(Dict[str, OrderedDict], {})
        self.room_records[topics.lift_states] = records

        def on_next(state: LiftState):
            dic = message_to_ordereddict(state)
            records[state.lift_name] = dic

            async def emit_task():
                await self.sio.emit(topics.lift_states, dic, to=topics.lift_states)
                self.logger.debug(f'emitted message to room "{topics.lift_states}"')

            self.loop.create_task(emit_task())

        self.rmf_gateway.lift_states.subscribe(on_next)

    def _init_lift_health(self):
        records = cast(Dict[str, OrderedDict], {})
        self.room_records[topics.lift_health] = records

        def on_next(health: LiftHealth):
            health_dict = health.to_dict()
            records[health.name] = health_dict

            async def emit_task():
                await self.sio.emit(
                    topics.lift_health, health_dict, to=topics.lift_health
                )
                self.logger.debug(f'emitted message to room "{topics.lift_health}"')

            self.loop.create_task(emit_task())

        self.rmf_gateway.lift_health.subscribe(on_next)

    def _init_building_map(self):
        self.room_records[topics.building_map] = None

        def on_next(building_map: Optional[BuildingMap]):
            """
            1. Converts a `BuildingMap` message to an ordered dict.
            2. Saves the images into `{static_directory}/{map_name}/`.
            3. Change the `AffineImage` `data` field to the url of the image.
            """
            if not building_map:
                return
            self.logger.info("got new building map")
            self._building_map = message_to_ordereddict(building_map)

            for i in range(len(building_map.levels)):
                level: Level = building_map.levels[i]
                for j in range(len(level.images)):
                    image: AffineImage = level.images[j]
                    # look at non-crypto hashes if we need more performance
                    sha1_hash = hashlib.sha1()
                    sha1_hash.update(image.data)
                    fingerprint = base64.b32encode(sha1_hash.digest()).lower().decode()
                    relpath = f"{building_map.name}/{level.name}-{image.name}.{fingerprint}.{image.encoding}"  # pylint: disable=line-too-long
                    urlpath = self.static_files.add_file(image.data, relpath)
                    self._building_map["levels"][i]["images"][j]["data"] = urlpath
            self.room_records[topics.building_map] = {
                building_map.name: self._building_map
            }

            async def emit_task():
                await self.sio.emit(
                    topics.building_map, self._building_map, to=topics.building_map
                )
                self.logger.debug(f'emitted message to room "{topics.building_map}"')

            self.loop.create_task(emit_task())

        self.rmf_gateway.building_map.subscribe(on_next)

    async def _on_subscribe(self, sid, topic):
        self.logger.info(f'[{sid}] got new subscription for "{topic}"')

        if topic not in self.room_records:
            self.logger.warn(f'[{sid}] unknown topic "{topic}"')
            await self.sio.emit("subscribe", "unknown topic", to=sid)
            return

        records: dict = self.room_records[topic]
        if records:
            coros = [self.sio.emit(topic, rec, sid) for rec in records.values()]
            await asyncio.gather(*coros)
            self.logger.info(f"[{sid}] emitted existing records to new subscriber")
        else:
            self.logger.info(
                f"[{sid}] skipped emitting initial records (no existing records)"
            )
        self.sio.enter_room(sid, topic)
        self.logger.info(f'[{sid}] added to room "{topic}"')

        # TODO: support unsubscribe
        await self.sio.emit("subscribe", "ok", to=sid)

    def _on_connect(self, sid: str, environ: dict, auth: Optional[dict] = None):
        try:
            self.authenticator.authenticate(environ, auth)
            self.logger.info(
                f'[{sid}] new connection from "{environ["REMOTE_ADDR"]}:{environ["REMOTE_PORT"]}"'
            )
            return True
        except AuthenticationError as e:
            self.logger.error(f"authentication failed: {e}")
            return False

    def _on_disconnect(self, sid):
        self.logger.info(f"[{sid}] disconnected")
