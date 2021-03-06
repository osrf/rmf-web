# import asyncio
# import base64
# import hashlib
# import logging
# from typing import Any, Dict, List, Mapping, Optional, cast

# import rx
# import socketio
# from rmf_building_map_msgs.msg import AffineImage, BuildingMap, Level
# from rmf_task_msgs.msg import TaskSummary
# from rosidl_runtime_py.convert import message_to_ordereddict
# from rx.core.typing import Disposable
# from rx.operators import map as rx_map

# from ..authenticator import AuthenticationError, JwtAuthenticator
# from ..repositories import StaticFilesRepository
# from .gateway import RmfGateway
# from .topics import topics


# class RmfIO:
#     def __init__(
#         self,
#         sio: socketio.AsyncServer,
#         rmf_gateway: RmfGateway,
#         static_files: StaticFilesRepository,
#         *,
#         logger: logging.Logger = None,
#         loop: asyncio.AbstractEventLoop = None,
#         authenticator: Optional[JwtAuthenticator] = None,
#     ):
#         self.sio = sio
#         self.rmf_gateway = rmf_gateway
#         self.static_files = static_files
#         self.logger = logger or sio.logger
#         self.loop = loop or asyncio.get_event_loop()
#         self.authenticator = authenticator
#         self.room_records = {}
#         self._subscriptions: List[Disposable] = []
#         self._started = False

#         self.sio.on("connect", self._on_connect)
#         self.sio.on("disconnect", self._on_disconnect)
#         self.sio.on("subscribe", self._on_subscribe)

#     def start(self):
#         if self._started:
#             return
#         self._init_door_state()
#         self._init_door_health()
#         self._init_lift_state()
#         self._init_lift_health()
#         self._init_dispenser_state()
#         self._init_dispenser_health()
#         self._init_ingestor_state()
#         self._init_ingestor_health()
#         self._init_fleet_state()
#         self._init_robot_health()
#         self._init_task_summary()
#         self._init_building_map()
#         self._started = True

#     def stop(self):
#         for sub in self._subscriptions:
#             sub.dispose()
#         self._subscriptions.clear()
#         self._started = False

#     def _init_room(self, topic: str, source: rx.Observable):
#         """
#         :param source: rx.Observable[Mapping[str, Any]].
#             The mapping values must be json serializable.
#         """
#         records = cast(Dict[str, Any], {})
#         self.room_records[topic] = records

#         def on_next(new_records: Mapping[str, Any]):
#             records.update(new_records)

#             async def emit_task():
#                 for v in new_records.values():
#                     await self.sio.emit(topic, v, to=topic)
#                 self.logger.debug(f'emitted message to room "{topic}"')

#             self.loop.create_task(emit_task())

#         self._subscriptions.append(source.subscribe(on_next))

#     def _init_door_state(self):
#         self._init_room(
#             topics.door_states,
#             self.rmf_gateway.door_states.pipe(
#                 rx_map(lambda x: {x.door_name: message_to_ordereddict(x)})
#             ),
#         )

#     def _init_door_health(self):
#         self._init_room(
#             topics.door_health,
#             self.rmf_gateway.door_health.pipe(rx_map(lambda x: {x.id_: x.to_dict()})),
#         )

#     def _init_lift_state(self):
#         self._init_room(
#             topics.lift_states,
#             self.rmf_gateway.lift_states.pipe(
#                 rx_map(lambda x: {x.lift_name: message_to_ordereddict(x)})
#             ),
#         )

#     def _init_lift_health(self):
#         self._init_room(
#             topics.lift_health,
#             self.rmf_gateway.lift_health.pipe(rx_map(lambda x: {x.id_: x.to_dict()})),
#         )

#     def _init_dispenser_state(self):
#         self._init_room(
#             topics.dispenser_states,
#             self.rmf_gateway.dispenser_states.pipe(
#                 rx_map(lambda x: {x.guid: message_to_ordereddict(x)})
#             ),
#         )

#     def _init_dispenser_health(self):
#         self._init_room(
#             topics.dispenser_health,
#             self.rmf_gateway.dispenser_health.pipe(
#                 rx_map(lambda x: {x.id_: x.to_dict()})
#             ),
#         )

#     def _init_ingestor_state(self):
#         self._init_room(
#             topics.ingestor_states,
#             self.rmf_gateway.ingestor_states.pipe(
#                 rx_map(lambda x: {x.guid: message_to_ordereddict(x)})
#             ),
#         )

#     def _init_ingestor_health(self):
#         self._init_room(
#             topics.ingestor_health,
#             self.rmf_gateway.ingestor_health.pipe(
#                 rx_map(lambda x: {x.id_: x.to_dict()})
#             ),
#         )

#     def _init_fleet_state(self):
#         self._init_room(
#             topics.fleet_states,
#             self.rmf_gateway.fleet_states.pipe(
#                 rx_map(lambda x: {x.name: message_to_ordereddict(x)})
#             ),
#         )

#     def _init_robot_health(self):
#         self._init_room(
#             topics.robot_health,
#             self.rmf_gateway.robot_health.pipe(rx_map(lambda x: {x.id_: x.to_dict()})),
#         )

#     def _init_task_summary(self):
#         topic = topics.task_summaries

#         self.room_records[topic] = lambda: {
#             x.task_id: message_to_ordereddict(x)
#             for x in self.rmf_gateway.current_task_summaries.values()
#         }

#         def on_next(task: TaskSummary):
#             async def emit_task():
#                 await self.sio.emit(topic, message_to_ordereddict(task), to=topic)
#                 self.logger.debug(f'emitted message to room "{topic}"')

#             self.loop.create_task(emit_task())

#         self._subscriptions.append(self.rmf_gateway.task_summaries.subscribe(on_next))

#     def _init_building_map(self):
#         def process(building_map: Optional[BuildingMap]):
#             """
#             1. Converts a `BuildingMap` message to an ordered dict.
#             2. Saves the images into `{static_directory}/{map_name}/`.
#             3. Change the `AffineImage` `data` field to the url of the image.
#             """
#             if not building_map:
#                 return {}
#             self.logger.info("got new building map")
#             processed_map = message_to_ordereddict(building_map)

#             for i in range(len(building_map.levels)):
#                 level: Level = building_map.levels[i]
#                 for j in range(len(level.images)):
#                     image: AffineImage = level.images[j]
#                     # look at non-crypto hashes if we need more performance
#                     sha1_hash = hashlib.sha1()
#                     sha1_hash.update(image.data)
#                     fingerprint = base64.b32encode(sha1_hash.digest()).lower().decode()
#                     relpath = f"{building_map.name}/{level.name}-{image.name}.{fingerprint}.{image.encoding}"  # pylint: disable=line-too-long
#                     urlpath = self.static_files.add_file(image.data, relpath)
#                     processed_map["levels"][i]["images"][j]["data"] = urlpath
#             self.rmf_gateway.building_map.on_next(processed_map)
#             return {building_map.name: processed_map}

#         self._init_room(
#             topics.building_map,
#             self.rmf_gateway.rmf_building_map.pipe(rx_map(process)),
#         )

#     async def _on_subscribe(self, sid, topic):
#         self.logger.info(f'[{sid}] got new subscription for "{topic}"')

#         if topic not in self.room_records:
#             self.logger.warn(f'[{sid}] unknown topic "{topic}"')
#             await self.sio.emit("subscribe", "unknown topic", to=sid)
#             return

#         if callable(self.room_records[topic]):
#             records: dict = self.room_records[topic]()
#         else:
#             records: dict = self.room_records[topic]
#         if records:
#             coros = [self.sio.emit(topic, rec, sid) for rec in records.values()]
#             await asyncio.gather(*coros)
#             self.logger.info(f"[{sid}] emitted existing records to new subscriber")
#         else:
#             self.logger.info(
#                 f"[{sid}] skipped emitting initial records (no existing records)"
#             )
#         self.sio.enter_room(sid, topic)
#         self.logger.info(f'[{sid}] added to room "{topic}"')

#         # TODO: support unsubscribe
#         await self.sio.emit("subscribe", "ok", to=sid)

#     def _on_connect(self, sid: str, environ: dict, auth: Optional[dict] = None):
#         self.logger.info(
#             f'[{sid}] new connection from "{environ["REMOTE_ADDR"]}:{environ["REMOTE_PORT"]}"'
#         )

#         if not self.authenticator:
#             return True

#         try:
#             if auth is None:
#                 raise AuthenticationError("no auth options provided")
#             if "token" not in auth:
#                 raise AuthenticationError("no token provided")
#             self.authenticator.verify_token(auth["token"])
#             return True
#         except AuthenticationError as e:
#             self.logger.error(f"authentication failed: {e}")
#             return False

#     def _on_disconnect(self, sid):
#         self.logger.info(f"[{sid}] disconnected")
