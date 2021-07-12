import logging
from typing import Callable, Optional

from fastapi import Depends, Query

from api_server.models.fleets import Robot
from api_server.models.pagination import Pagination
from api_server.models.tasks import TaskStateEnum

from ..dependencies import WithBaseQuery, base_query_params
from ..fast_io import FastIORouter
from ..gateway import RmfGateway
from ..models import Fleet, FleetState, RobotHealth
from ..models import tortoise_models as ttm
from ..rmf_io import RmfEvents
from .tasks.utils import convert_task_status_msg


class FleetsRouter(FastIORouter):
    def __init__(
        self,
        rmf_events: RmfEvents,
        rmf_gateway_dep: Callable[[], RmfGateway],
        *,
        logger: logging.Logger,
    ):
        super().__init__(tags=["Fleets"])

        class GetFleetsResponse(Pagination.response_model(Fleet)):
            pass

        @self.get("", response_model=GetFleetsResponse)
        async def get_fleets(
            with_base_query: WithBaseQuery[ttm.FleetState] = Depends(
                base_query_params({"fleet_name": "id_"})
            ),
            fleet_name: Optional[str] = Query(
                None, description="comma separated list of fleet names"
            ),
        ):
            filter_params = {}
            if fleet_name is not None:
                filter_params["id___in"] = fleet_name.split(",")
            states = await with_base_query(ttm.FleetState.filter(**filter_params))
            results: Pagination[Fleet] = Pagination(
                total_count=states.total_count,
                items=[Fleet(name=s.id_, state=s.data) for s in states.items],
            )
            return results

        class GetRobotsResponse(Pagination.response_model(Robot)):
            pass

        @self.get("/robots", response_model=GetRobotsResponse)
        async def get_robots(
            with_base_query: WithBaseQuery[ttm.RobotState] = Depends(
                base_query_params()
            ),
            fleet_name: Optional[str] = Query(
                None, description="comma separated list of fleet names"
            ),
            robot_name: Optional[str] = Query(
                None, description="comma separated list of robot names"
            ),
        ):
            filter_params = {}
            if fleet_name is not None:
                filter_params["fleet_name__in"] = fleet_name.split(",")
            if robot_name is not None:
                filter_params["robot_name__in"] = robot_name.split(",")

            robot_states = await with_base_query(ttm.RobotState.filter(**filter_params))
            robots = {
                f"{q.fleet_name}/{q.robot_name}": Robot(
                    fleet=q.fleet_name, name=q.robot_name, state=q.data
                )
                for q in robot_states.items
            }

            filter_states = [
                TaskStateEnum.ACTIVE.value,
                TaskStateEnum.PENDING.value,
                TaskStateEnum.QUEUED.value,
            ]
            tasks = await ttm.TaskSummary.filter(
                state__in=filter_states,
                **filter_params,
            ).order_by("start_time")
            for t in tasks:
                r = robots.get(f"{t.fleet_name}/{t.robot_name}", None)
                # This should only happen under very rare scenarios, when there are
                # multiple fleets with the same robot name and there are active tasks
                # assigned to those robots and the robot states are not synced to the
                # tasks summaries.
                if r is None:
                    logger.warn(
                        f'task "{t.id_}" is assigned to an unknown fleet/robot ({t.fleet_name}/{t.robot_name}'
                    )
                r.tasks.append(
                    convert_task_status_msg(t.to_pydantic(), rmf_gateway_dep())
                )

            return Pagination(
                total_count=robot_states.total_count, items=list(robots.values())
            )

        @self.watch("/{name}/state", rmf_events.fleet_states, response_model=FleetState)
        def get_fleet_state(fleet_state: FleetState):
            return {"name": fleet_state.name}, fleet_state

        @self.watch(
            "/{fleet}/{robot}/health",
            rmf_events.robot_health,
            response_model=RobotHealth,
        )
        def get_robot_health(robot_health: RobotHealth):
            fleet, robot = robot_health.id_.split("/")
            return {"fleet": fleet, "robot": robot}, robot_health
