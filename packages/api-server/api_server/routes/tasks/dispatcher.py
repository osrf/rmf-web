from fastapi.exceptions import HTTPException
from rmf_task_msgs.srv import CancelTask as RmfCancelTask
from rmf_task_msgs.srv import SubmitTask as RmfSubmitTask

from ... import models as mdl
from ...gateway import RmfGateway


class DispatcherClient:
    def __init__(self, rmf_gateway: RmfGateway):
        self.rmf_gateway = rmf_gateway

    async def submit_task_request(self, req_msg: RmfSubmitTask.Request):
        """
        Task Submission - This function will trigger a ros srv call to the
        dispatcher node, and return a response. Function will return a Task ID.
        Raises "HTTPException" if service call fails.
        """
        resp: RmfSubmitTask.Response = await self.rmf_gateway.call_service(
            self.rmf_gateway.submit_task_srv, req_msg
        )
        return resp

    def get_sim_time(self):
        if self.rmf_gateway.get_parameter("use_sim_time").value:
            sim_time = self.rmf_gateway.get_clock().now().to_msg()
        else:
            sim_time = None
        return sim_time

    async def cancel_task_request(self, task: mdl.CancelTask) -> bool:
        """
        Cancel Task - This function will trigger a ros srv call to the
        dispatcher node, and return a response.
        Raises "HTTPException" if service call fails.
        """
        req = RmfCancelTask.Request()
        req.requester = "rmf-server"
        req.task_id = task.task_id
        response: RmfCancelTask.Response = await self.rmf_gateway.call_service(
            self.rmf_gateway.cancel_task_srv, req
        )
        if not response.success:
            raise HTTPException(500, response.message)
        return response.success
