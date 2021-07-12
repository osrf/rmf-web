from rmf_task_msgs.msg import TaskSummary as RmfTaskSummary

from ...gateway import RmfGateway
from ...models.tasks import TaskProgress, TaskSummary


def convert_task_status_msg(
    task_summary: TaskSummary, rmf_gateway: RmfGateway
) -> TaskProgress:
    """
    convert rmf task summary msg to a task
    """
    now = rmf_gateway.get_clock().now().to_msg().sec  # only use sec
    # Generate a progress percentage
    duration = abs(task_summary.end_time.sec - task_summary.start_time.sec)
    # check if is completed
    if task_summary.state == RmfTaskSummary.STATE_COMPLETED:
        progress = "100%"
    # check if it state is queued/cancelled
    elif duration == 0 or (task_summary.state in [0, 4]):
        progress = "0%"
    else:
        percent = int(100 * (now - task_summary.start_time.sec) / float(duration))
        if percent < 0:
            progress = "0%"
        elif percent > 100:
            progress = "Delayed"
        else:
            progress = f"{percent}%"
    return TaskProgress(task_summary=task_summary, progress=progress)
