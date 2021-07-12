import unittest

# Husky is sorting tortoise in a way that tortoise goes after our custom packages.
# and because of that the lint is failing
import tortoise
from fastapi.testclient import TestClient
from models import (
    DispenserState,
    DoorState,
    FleetState,
    HealthStatus,
    IngestorState,
    LiftState,
    TaskSummary,
)
from rest_server.__mocks__ import parsed_data
from rest_server.app import get_app

from .parser_dispatcher import log_model_dispatcher

app = get_app()


class TestCaseLogParserDispatcher(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        await tortoise.Tortoise.init(
            db_url="sqlite://:memory:",
            modules={"models": ["models"]},
        )
        await tortoise.Tortoise.generate_schemas()
        self.client = TestClient(app)

    async def asyncTearDown(self):
        await tortoise.Tortoise.close_connections()

    async def test_dispenser_state_created(self):
        await log_model_dispatcher(parsed_data.mock_dispenser_state)
        instance = await DispenserState.first()
        self.assertEqual(instance.guid, "coke_dispenser")

    async def test_door_state_created(self):
        await log_model_dispatcher(parsed_data.mock_door_state)
        instance = await DoorState.first()
        self.assertEqual(instance.name, "hardware_door")

    async def test_fleet_state_created(self):
        await log_model_dispatcher(parsed_data.mock_fleet_state)
        instance = await FleetState.all()
        self.assertEqual(len(instance), 2)

        self.assertEqual(instance[0].fleet_name, "tinyRobot")
        self.assertEqual(instance[0].robot_name, "tinyRobot1")

        self.assertEqual(instance[1].fleet_name, "tinyRobot")
        self.assertEqual(instance[1].robot_name, "tinyRobot2")

    async def test_task_summary_created(self):
        await log_model_dispatcher(parsed_data.mock_task_summary)
        instance = await TaskSummary.first()
        self.assertEqual(instance.task_id, "Loop0")
        self.assertEqual(instance.status, None)

    async def test_door_health_created(self):
        data = 'door_health:{"id": "hardware_door", "health_status": "HealthStatus.HEALTHY", "health_message": null}\n'
        await log_model_dispatcher(data)
        instance = await HealthStatus.first()
        self.assertEqual(instance.actor_id, "hardware_door")
        self.assertEqual(instance.device, "door_health")

    async def test_robot_health_created(self):
        data = 'robot_health:{"id": "robot1", "health_status": "HealthStatus.HEALTHY", "health_message": null}\n'
        await log_model_dispatcher(data)
        instance = await HealthStatus.first()
        self.assertEqual(instance.actor_id, "robot1")
        self.assertEqual(instance.device, "robot_health")

    async def test_lift_health_created(self):
        data = 'lift_health:{"id": "lift1", "health_status": "HealthStatus.HEALTHY", "health_message": null}\n'
        await log_model_dispatcher(data)
        instance = await HealthStatus.first()
        self.assertEqual(instance.actor_id, "lift1")
        self.assertEqual(instance.device, "lift_health")

    async def test_ingestor_state_created(self):
        await log_model_dispatcher(parsed_data.mock_ingestor_state)
        instance = await IngestorState.first()
        self.assertEqual(instance.guid, "coke_ingestor")

    async def test_lift_state_created(self):
        await log_model_dispatcher(parsed_data.mock_lift_state)
        instance = await LiftState.first()
        self.assertEqual(instance.name, "test_lift")
