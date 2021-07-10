import asyncio
import concurrent.futures
import inspect
import os
import os.path
import threading
import time
import unittest
from typing import Awaitable, Callable, Optional, TypeVar, Union

import jwt
import rclpy
import rclpy.node
import requests
from urllib3.util.retry import Retry

from ..app import App
from ..app_config import load_config
from ..models import User
from ..permissions import RmfRole
from ..test.server import BackgroundServer

T = TypeVar("T")


def try_until(
    action: Callable[[], T],
    predicate: Callable[[T], bool],
    timeout=5,
    interval=0.5,
) -> T:
    """
    Do action until an expected result is received.
    Returns the last result.
    """
    end_time = time.time() + timeout
    while time.time() < end_time:
        result = action()
        success = predicate(result)
        if success:
            return result
        time.sleep(interval)
    return result


async def async_try_until(
    action: Callable[[], Awaitable[T]],
    predicate: Union[Callable[[T], Awaitable[bool]], Callable[[T], bool]],
    timeout=5,
    interval=0.5,
) -> Awaitable[T]:
    """
    Do action until an expected result is received.
    Returns the last result.
    """
    end_time = time.time() + timeout
    while time.time() < end_time:
        result = await action()
        success = predicate(result)
        if inspect.isawaitable(success):
            success = await success
        if success:
            return result
        await asyncio.sleep(interval)
    return result


here = os.path.dirname(__file__)
with open(f"{here}/test.key", "br") as f:
    jwt_key = f.read()


def generate_token(user: User):
    jwt_roles = list(user.roles)
    jwt_roles.extend(list(user.groups))
    return jwt.encode(
        {
            "client_id": "test",
            "aud": "test",
            "iss": "test",
            "preferred_username": user.username,
            "resource_access": {"test": {"roles": jwt_roles}},
        },
        jwt_key,
        "RS256",
    )


class RouteFixture(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = App(load_config(f"{os.path.dirname(__file__)}/test_config.py"))
        cls.server = BackgroundServer(cls.app)
        cls.server.start()
        cls.base_url = cls.server.base_url

        retry = Retry(total=5, backoff_factor=0.1)
        adapter = requests.adapters.HTTPAdapter(max_retries=retry)
        cls.session = requests.Session()
        cls.user = User(username="test_user", roles=[RmfRole.SuperAdmin.value])
        cls.set_user(cls.user)
        cls.session.headers["Content-Type"] = "application/json"
        cls.session.mount("http://", adapter)

        cls.rcl_ctx = rclpy.Context()
        rclpy.init(context=cls.rcl_ctx)
        cls.rcl_executor = rclpy.executors.SingleThreadedExecutor(context=cls.rcl_ctx)
        cls.node = rclpy.node.Node("test_node", context=cls.rcl_ctx)
        cls.spinning = True

        def spin():
            while cls.spinning:
                rclpy.spin_once(cls.node, executor=cls.rcl_executor, timeout_sec=0.1)

        cls.spin_thread = threading.Thread(target=spin)
        cls.spin_thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.spinning = False
        cls.spin_thread.join()
        cls.node.destroy_node()
        rclpy.shutdown(context=cls.rcl_ctx)

        cls.session.close()

        cls.server.stop()

    @classmethod
    def set_user(cls, user: User):
        cls.user = user
        token = generate_token(cls.user)
        cls.session.headers["Authorization"] = f"bearer {token}"

    @classmethod
    def run_in_app_loop(cls, work: Awaitable, timeout: Optional[float] = None):
        cls.server.app.wait_ready()
        fut = concurrent.futures.Future()

        async def task():
            fut.set_result(await work)

        cls.server.app.loop.create_task(task())
        return fut.result(timeout)
