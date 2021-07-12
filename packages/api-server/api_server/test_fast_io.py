import time
import unittest
from concurrent import futures
from concurrent.futures import Future

import requests
import socketio

from .test.fast_io_app import app
from .test.server import BackgroundServer


class TestFastIO(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = BackgroundServer(app)
        cls.server.start()
        cls.base_url = cls.server.base_url

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()

    def setUp(self):
        self.client = socketio.Client()
        tries = 0
        while not self.client.connected:
            try:
                tries += 1
                self.client.connect(self.base_url)
            except socketio.exceptions.ConnectionError:
                if tries > 10:
                    raise
                time.sleep(0.5)

    def tearDown(self):
        self.client.disconnect()

    def check_subscribe_success(self, prefix: str):
        resp_fut = Future()
        self.client.on("subscribe", resp_fut.set_result)
        self.client.emit(
            "subscribe", {"path": prefix + "/video_rental/aegis rim/available"}
        )
        resp = resp_fut.result(1)
        self.assertTrue(resp["success"])

    def check_events(self, prefix: str):
        self.check_subscribe_success(prefix)

        event_fut = Future()
        self.client.on(
            prefix + "/video_rental/aegis rim/available", event_fut.set_result
        )
        resp = requests.post(
            f"{self.base_url}{prefix}/video_rental/return_video",
            json={"film_title": "aegis rim"},
        )
        event = event_fut.result(1)
        self.assertEqual(event["film"], "aegis rim")
        self.assertTrue(event["available"])

        resp = requests.get(f"{self.base_url}{prefix}/video_rental/aegis rim/available")
        resp_json = resp.json()
        self.assertEqual(resp_json["film"], "aegis rim")
        self.assertTrue(resp_json["available"])

    def test_receive_events(self):
        self.check_events("")

    def test_receive_events_router_with_prefix(self):
        self.check_events("/router_with_prefix")

    def test_receive_events_router_include_with_prefix(self):
        self.check_events("/router_include_with_prefix")

    def test_receive_events_router_both_prefix(self):
        self.check_events("/include_prefix/router_both_prefix")

    def test_unsubscribe(self):
        path = "/video_rental/aegis rim/available"

        fut = Future()
        self.client.on("subscribe", fut.set_result)
        self.client.emit("subscribe", {"path": path})
        resp = fut.result(1)
        self.assertTrue(resp["success"])

        fut = Future()
        self.client.on("unsubscribe", fut.set_result)
        self.client.emit("unsubscribe", {"path": path})
        resp = fut.result(1)
        self.assertTrue(resp["success"])

        fut = Future()
        self.client.on("subscribe", fut.set_result)
        resp = requests.post(
            f"{self.base_url}/video_rental/return_video",
            json={"film_title": "aegis rim"},
        )
        self.assertEqual(200, resp.status_code)
        self.assertRaises(futures.TimeoutError, lambda: fut.result(1))
