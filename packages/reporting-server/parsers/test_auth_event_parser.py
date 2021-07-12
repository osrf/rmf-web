import unittest

from rest_server.__mocks__ import raw_data

from .auth_event_parser import auth_event_parser


class TestCaseAuthEvent(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.data = raw_data.mock_keycloak_login_error["log"]

    async def test_parse_and_get_values(self):
        parsed_values = await auth_event_parser(self.data)
        self.assertEqual(parsed_values["username"], "test")
        self.assertEqual(parsed_values["user_keycloak_id"], None)
        self.assertEqual(parsed_values["event_type"], "LOGIN_ERROR")
        self.assertEqual(
            parsed_values["realm_id"], "579ce396-83c7-4094-964d-7ea07553089f"
        )
        self.assertEqual(parsed_values["client_id"], "reporting")
        self.assertEqual(parsed_values["ip_address"], "192.168.49.1")
