# conflicts with isort because of local non-relative import
# pylint: disable=wrong-import-order
import unittest

from fastapi.testclient import TestClient
from models import DispenserState, DoorState, RawLog
from models.auth_events import AuthEvents
from rest_server.__mocks__ import raw_data
from rest_server.app import get_app
from tortoise import Tortoise

from .log_creation_handler import (
    create_keycloak_log,
    create_raw_log,
    create_rmf_server_log,
)

app = get_app()


class TestCaseLogRMFServerCreationRepository(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        await Tortoise.init(
            db_url="sqlite://:memory:",
            modules={"models": ["models"]},
        )
        await Tortoise.generate_schemas()
        self.client = TestClient(app)

    async def asyncTearDown(self):
        await Tortoise.close_connections()

    async def test_no_data_sent_to_rmfserver(self):
        response = await create_rmf_server_log([])
        self.assertEqual(response, "No data received")

    async def test_create_a_rmfserver_log_correctly(self):
        data = [raw_data.mock_dispenser_state, raw_data.mock_door_state]
        response = await create_rmf_server_log(data)
        self.assertEqual(response, "Logs were saved correctly")

    async def test_rmfserver_handle_and_return_error(self):
        data = [
            {
                "log2": 'INFO:app.BookKeeper.dispenser_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_dispenser", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
                "stream": "stdout",
            },
            raw_data.mock_door_state,
        ]

        response = await create_rmf_server_log(data)
        self.assertEqual(len(response), 1)

    async def test_rmfserver_handle_creation_of_logs(self):
        await create_rmf_server_log(
            [raw_data.mock_dispenser_state, raw_data.mock_door_state]
        )
        dispenser = await DispenserState.first()
        door = await DoorState.first()
        self.assertEqual(dispenser.guid, "coke_dispenser")
        self.assertEqual(door.name, "hardware_door")


class TestCaseRawLogCreationRepository(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        await Tortoise.init(
            db_url="sqlite://:memory:",
            modules={"models": ["models"]},
        )
        await Tortoise.generate_schemas()
        self.client = TestClient(app)

    async def asyncTearDown(self):
        await Tortoise.close_connections()

    async def test_no_data_sent_to_rawlog(self):
        response = await create_raw_log([])
        self.assertEqual(response, "No data received")

    async def test_create_a_raw_log_correctly(self):
        data = [
            raw_data.mock_dispenser_state,
            raw_data.mock_door_state,
            "this is a test",
        ]
        response = await create_raw_log(data)
        self.assertEqual(response, "Logs were saved correctly")

    async def test_raw_log_handle_creation_of_logs(self):
        data = [
            raw_data.mock_dispenser_state,
            raw_data.mock_door_state,
            "this is a test",
        ]
        await create_raw_log(data)
        dispenser = await RawLog.all()
        self.assertEqual(len(dispenser), 3)

    async def test_raw_log_handle_creation_of_logs_with_container_name(self):
        await create_raw_log([raw_data.mock_dispenser_state])
        log = await RawLog.first()
        self.assertEqual(log.container_name, "app-that-writes-logs")

    async def test_keycloak_log_creation(self):
        await create_keycloak_log(
            [raw_data.mock_keycloak_login_error, raw_data.mock_keycloak_login]
        )
        logs = await AuthEvents.all()
        self.assertEqual(len(logs), 2)

    async def test_keycloak_logout_creation(self):
        await create_keycloak_log([raw_data.mock_keycloak_logout])
        logs = await AuthEvents.all()
        self.assertEqual(len(logs), 1)
