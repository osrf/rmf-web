from fastapi.exceptions import HTTPException
from rmf_task_msgs.srv import CancelTask as RmfCancelTask
from rmf_task_msgs.srv import SubmitTask as RmfSubmitTask

from ... import models as mdl
from ...gateway import RmfGateway
from ...models import tortoise_models as ttm
from ...permissions import Enforcer, Permission


class DispatcherClient:
    def __init__(self, rmf_gateway: RmfGateway):
        self.rmf_gateway = rmf_gateway

    async def submit_task_request(self, user: mdl.User, req_msg: RmfSubmitTask.Request):
        """
        Task Submission - This function will trigger a ros srv call to the
        dispatcher node, and return a response. Function will return a Task ID.
        Raises "HTTPException" if service call fails.
        """
        if not Enforcer.can_submit_task(user):
            raise HTTPException(401)

        resp: RmfSubmitTask.Response = await self.rmf_gateway.call_service(
            self.rmf_gateway.submit_task_srv, req_msg
        )

        new_task = (
            await ttm.TaskSummary.update_or_create(
                {"owner": user.username, "data": {"task_id": resp.task_id}},
                id_=resp.task_id,
            )
        )[0]
        await Enforcer.save_permissions(new_task, user.groups, [Permission.Read])

        return resp

    def get_sim_time(self):
        if self.rmf_gateway.get_parameter("use_sim_time").value:
            sim_time = self.rmf_gateway.get_clock().now().to_msg()
        else:
            sim_time = None
        return sim_time

    async def cancel_task_request(self, task: mdl.CancelTask, user: mdl.User) -> bool:
        """
        Cancel Task - This function will trigger a ros srv call to the
        dispatcher node, and return a response.
        Raises "HTTPException" if service call fails.
        """
        find_task = (
            await Enforcer.query(user, ttm.TaskSummary).filter(id_=task.task_id).first()
        )
        if find_task is None:
            raise HTTPException(404)

        if find_task.owner != user.username and not Enforcer.can_cancel_task(user):
            raise HTTPException(401)

        req = RmfCancelTask.Request()
        req.requester = "rmf-server"
        req.task_id = task.task_id
        response: RmfCancelTask.Response = await self.rmf_gateway.call_service(
            self.rmf_gateway.cancel_task_srv, req
        )
        if not response.success:
            raise HTTPException(500, response.message)
        return response.success
