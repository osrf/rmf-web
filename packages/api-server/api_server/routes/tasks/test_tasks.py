import asyncio
from typing import Sequence

from rmf_task_msgs.msg import TaskSummary as RmfTaskSummary
from rmf_task_msgs.msg import TaskType as RmfTaskType
from rmf_task_msgs.srv import CancelTask as RmfCancelTask
from rmf_task_msgs.srv import SubmitTask as RmfSubmitTask

from ...models import CancelTask, CleanTaskDescription, SubmitTask, TaskSummary, User
from ...models import tortoise_models as ttm
from ...permissions import Enforcer, Permission, RmfRole
from ...test.test_fixtures import RouteFixture


class TasksFixture(RouteFixture):
    def save_tasks(self, tasks: Sequence[TaskSummary], user: User):
        async def save_data():
            ttm_tasks = await asyncio.gather(
                *(ttm.TaskSummary.save_pydantic(t, user) for t in tasks)
            )
            await asyncio.gather(
                *(
                    Enforcer.save_permissions(t, user.groups, [Permission.Read])
                    for t in ttm_tasks
                )
            )

        self.run_in_app_loop(save_data())


class TestTasksRoute(TasksFixture):
    def test_smoke(self):
        #
        # setup mock rmf services
        #
        counter = 0

        def rmf_submit_task(
            _request: RmfSubmitTask.Request, response: RmfSubmitTask.Response
        ):
            nonlocal counter
            counter += 1
            response.success = True
            response.task_id = f"task_{counter}"
            return response

        submit_task_srv = self.node.create_service(
            RmfSubmitTask, "submit_task", rmf_submit_task
        )

        def rmf_cancel_task(
            _request: RmfCancelTask.Request, response: RmfCancelTask.Response
        ):
            response.success = True
            return response

        cancel_task_srv = self.node.create_service(
            RmfCancelTask, "cancel_task", rmf_cancel_task
        )

        user1 = User(username="user1", roles={RmfRole.SuperAdmin.value})
        user2 = User(
            username="user2", roles={RmfRole.TaskSubmit.value}, groups={"rmf_group1"}
        )
        user3 = User(username="user3", groups={"rmf_group1"})
        user4 = User(username="user4")
        user5 = User(
            username="user5", roles={RmfRole.TaskCancel.value}, groups={"rmf_group2"}
        )
        user6 = User(username="user6", roles={RmfRole.TaskAdmin.value})
        self.set_user(user1)

        # super admin can submit tasks
        submit_task = SubmitTask(
            task_type=RmfTaskType.TYPE_CLEAN,
            start_time=0,
            description=CleanTaskDescription(cleaning_zone="zone_1"),
            priority=0,
        )
        resp = self.session.post(
            f"{self.base_url}/tasks/submit_task", data=submit_task.json()
        )
        self.assertEqual(200, resp.status_code)
        submitted_task_1 = resp.json()["task_id"]

        # super admin can see submitted task
        self.set_user(user6)
        resp = self.session.get(f"{self.base_url}/tasks")
        tasks = resp.json()["items"]
        self.assertEqual(1, len(tasks))
        resp = self.session.get(f"{self.base_url}/tasks/{submitted_task_1}/summary")
        self.assertEqual(200, resp.status_code)

        # task admin can see submitted task
        resp = self.session.get(f"{self.base_url}/tasks")
        tasks = resp.json()["items"]
        self.assertEqual(1, len(tasks))
        resp = self.session.get(f"{self.base_url}/tasks/{submitted_task_1}/summary")
        self.assertEqual(200, resp.status_code)

        # another user cannot see submitted task
        self.set_user(user2)
        resp = self.session.get(f"{self.base_url}/tasks")
        tasks = resp.json()["items"]
        self.assertEqual(0, len(tasks))
        resp = self.session.get(f"{self.base_url}/tasks/{submitted_task_1}/summary")
        self.assertEqual(404, resp.status_code)

        # user without task submit role cannot submit task
        self.set_user(user3)
        resp = self.session.post(
            f"{self.base_url}/tasks/submit_task", data=submit_task.json()
        )
        self.assertEqual(401, resp.status_code)

        # user with task submit role can submit task
        self.set_user(user2)
        resp = self.session.post(
            f"{self.base_url}/tasks/submit_task", data=submit_task.json()
        )
        self.assertEqual(200, resp.status_code)
        submitted_task_2 = resp.json()["task_id"]

        # super admin can see task submitted by another user
        self.set_user(user1)
        resp = self.session.get(f"{self.base_url}/tasks")
        tasks = resp.json()["items"]
        self.assertEqual(2, len(tasks))
        resp = self.session.get(f"{self.base_url}/tasks/{submitted_task_2}/summary")
        self.assertEqual(200, resp.status_code)

        # user in same groups can see submitted task
        self.set_user(user3)
        resp = self.session.get(f"{self.base_url}/tasks")
        tasks = resp.json()["items"]
        self.assertEqual(1, len(tasks))
        self.assertEqual(submitted_task_2, tasks[0]["summary"]["task_id"])
        resp = self.session.get(f"{self.base_url}/tasks/{submitted_task_2}/summary")
        self.assertEqual(200, resp.status_code)

        # user in other groups cannot see submitted task
        self.set_user(user4)
        resp = self.session.get(f"{self.base_url}/tasks")
        tasks = resp.json()["items"]
        self.assertEqual(0, len(tasks))
        resp = self.session.get(f"{self.base_url}/tasks/{submitted_task_2}/summary")
        self.assertEqual(404, resp.status_code)

        #
        # Cancelling tasks
        #

        # users without task cancel role cannot cancel task
        self.set_user(user3)
        resp = self.session.post(
            f"{self.base_url}/tasks/cancel_task",
            data=CancelTask(task_id=submitted_task_2).json(),
        )
        self.assertEqual(401, resp.status_code)

        # users with task_cancel role but in different groups cannot cancel task
        self.set_user(user5)
        resp = self.session.post(
            f"{self.base_url}/tasks/cancel_task",
            data=CancelTask(task_id=submitted_task_2).json(),
        )
        # 404 because user shouldn't be able to see the task
        self.assertEqual(404, resp.status_code)

        # user can cancel own task even without task cancel role
        self.set_user(user2)
        resp = self.session.post(
            f"{self.base_url}/tasks/cancel_task",
            data=CancelTask(task_id=submitted_task_2).json(),
        )
        self.assertEqual(200, resp.status_code)

        # super admin can cancel other user's task
        self.set_user(user1)
        resp = self.session.post(
            f"{self.base_url}/tasks/cancel_task",
            data=CancelTask(task_id=submitted_task_2).json(),
        )
        self.assertEqual(200, resp.status_code)

        #
        # Clean up
        #
        cancel_task_srv.destroy()
        submit_task_srv.destroy()


class TestTasksQuery(TasksFixture):
    def test_query_tasks(self):
        dataset = (
            TaskSummary(
                task_id="task_1",
                fleet_name="fleet_1",
                submission_time={"sec": 1000, "nanosec": 0},
                start_time={"sec": 2000, "nanosec": 0},
                end_time={"sec": 3000, "nanosec": 0},
                robot_name="robot_1",
                state=RmfTaskSummary.STATE_COMPLETED,
                task_profile={
                    "description": {
                        "task_type": {"type": RmfTaskType.TYPE_LOOP},
                        "priority": {"value": 0},
                    }
                },
            ),
            TaskSummary(
                task_id="task_2",
                fleet_name="fleet_2",
                submission_time={"sec": 4000, "nanosec": 0},
                start_time={"sec": 5000, "nanosec": 0},
                end_time={"sec": 6000, "nanosec": 0},
                robot_name="robot_2",
                state=RmfTaskSummary.STATE_ACTIVE,
                task_profile={
                    "description": {
                        "task_type": {"type": RmfTaskType.TYPE_DELIVERY},
                        "priority": {"value": 1},
                    }
                },
            ),
        )

        self.save_tasks(dataset, self.user)

        resp = self.session.get(f"{self.base_url}/tasks?task_id=task_1,task_2")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 2)

        resp = self.session.get(f"{self.base_url}/tasks?fleet_name=fleet_1")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_1")
        self.assertEqual(items[0]["summary"]["fleet_name"], "fleet_1")

        resp = self.session.get(f"{self.base_url}/tasks?robot_name=robot_1")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_1")
        self.assertEqual(items[0]["summary"]["robot_name"], "robot_1")

        resp = self.session.get(f"{self.base_url}/tasks?state=completed")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_1")
        self.assertEqual(items[0]["summary"]["state"], RmfTaskSummary.STATE_COMPLETED)

        resp = self.session.get(f"{self.base_url}/tasks?task_type=loop")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_1")
        self.assertEqual(
            items[0]["summary"]["task_profile"]["description"]["task_type"]["type"],
            RmfTaskType.TYPE_LOOP,
        )

        resp = self.session.get(f"{self.base_url}/tasks?priority=0")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_1")

        resp = self.session.get(f"{self.base_url}/tasks?submission_time_since=4000")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_2")

        resp = self.session.get(f"{self.base_url}/tasks?start_time_since=5000")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_2")

        resp = self.session.get(f"{self.base_url}/tasks?end_time_since=6000")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["summary"]["task_id"], "task_2")

        # test no match
        resp = self.session.get(
            f"{self.base_url}/tasks?fleet_name=fleet_1&start_time_since=5000"
        )
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 0)

        # no query returns everything
        resp = self.session.get(f"{self.base_url}/tasks")
        self.assertEqual(resp.status_code, 200)
        resp_json = resp.json()
        items = resp_json["items"]
        self.assertEqual(len(items), 2)
