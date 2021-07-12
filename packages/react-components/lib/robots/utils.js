var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import * as RmfModels from 'rmf-models';
/**
 * Returns a uniquely identifiable string representing a robot.
 */
export function robotHash(name, fleet) {
  return name + '__' + fleet;
}
export function robotModeToString(robotMode) {
  switch (robotMode.mode) {
    case RmfModels.RobotMode.MODE_CHARGING:
      return 'Charging';
    case RmfModels.RobotMode.MODE_DOCKING:
      return 'Cleaning';
    case RmfModels.RobotMode.MODE_EMERGENCY:
      return 'Emergency';
    case RmfModels.RobotMode.MODE_GOING_HOME:
      return 'Going Home';
    case RmfModels.RobotMode.MODE_IDLE:
      return 'Idle';
    case RmfModels.RobotMode.MODE_MOVING:
      return 'Moving';
    case RmfModels.RobotMode.MODE_PAUSED:
      return 'Paused';
    case RmfModels.RobotMode.MODE_WAITING:
      return 'Waiting';
    default:
      return 'Unknown (' + robotMode.mode + ')';
  }
}
export function makeVerboseRobot(robot, assignedTasks) {
  return __assign(__assign({}, robot), { assignedTasks: assignedTasks });
}
//TODO: add this functionality into the server
export function allocateTasksToRobots(robots, tasks) {
  var removableTaskStates = [
    RmfModels.TaskSummary.STATE_ACTIVE,
    RmfModels.TaskSummary.STATE_PENDING,
    RmfModels.TaskSummary.STATE_QUEUED,
  ];
  var robotsWithAssignedTasks = robots.map(function (robot) {
    var assignedTasks = tasks.filter(function (task) {
      if (
        task.task_summary.robot_name == robot.name &&
        removableTaskStates.indexOf(task.task_summary.state) != -1
      ) {
        return task;
      }
    });
    return makeVerboseRobot(robot, assignedTasks);
  });
  return robotsWithAssignedTasks;
}
