import * as RmfModels from 'rmf-models';
// TODO: this is a hacky solution to get the actor from the task status,
// this should be changed when then backend sends an actor on the
// taskSummary message (we should use the actor provided by the message).
// https://github.com/osrf/rmf_core/issues/205
export var getActorFromStatus = function (status) {
  // Gets the name of the robot if it has any
  // eslint-disable-next-line
  return status.match(/\[[A-Za-z]([a-zA-Z0-9\/]){3,}\]+/gi);
};
export var formatStatus = function (status) {
  return status.split('|');
};
export var getStateLabel = function (state) {
  switch (state) {
    case RmfModels.TaskSummary.STATE_QUEUED:
      return 'QUEUED';
    case RmfModels.TaskSummary.STATE_ACTIVE:
      return 'ACTIVE';
    case RmfModels.TaskSummary.STATE_COMPLETED:
      return 'COMPLETED';
    case RmfModels.TaskSummary.STATE_FAILED:
      return 'FAILED';
    default:
      return 'UNKNOWN';
  }
};
export var sortTasksBySubmissionTime = function (tasks) {
  if (tasks.length === 0) return [];
  return tasks.sort(function (a, b) {
    return a.submission_time.nanosec < b.submission_time.nanosec ? 1 : -1;
  });
};
/**
 * Classifies and stores each task by its state.
 */
export var separateTasksByState = function (tasks, states) {
  var stateTasks = {};
  states.forEach(function (state) {
    stateTasks[state] = [];
  });
  Object.keys(tasks).forEach(function (key) {
    switch (tasks[key].state) {
      case RmfModels.TaskSummary.STATE_QUEUED:
        stateTasks.queued.push(tasks[key]);
        break;
      case RmfModels.TaskSummary.STATE_ACTIVE:
        stateTasks.active.push(tasks[key]);
        break;
      case RmfModels.TaskSummary.STATE_COMPLETED:
        stateTasks.completed.push(tasks[key]);
        break;
      case RmfModels.TaskSummary.STATE_FAILED:
        stateTasks.failed.push(tasks[key]);
        break;
      default:
        stateTasks.unknown.push(tasks[key]);
        break;
    }
  });
  return stateTasks;
};
/**
 * Sort tasks by state and by submission time, so what is active is always at the top of the list.
 */
export var sortTasks = function (tasks) {
  var states = ['active', 'queued', 'failed', 'completed', 'unknown'];
  var stateTasks = separateTasksByState(tasks, states);
  var sortedTasks = [];
  states.forEach(function (state) {
    sortedTasks.push.apply(sortedTasks, sortTasksBySubmissionTime(stateTasks[state]));
  });
  return sortedTasks;
};
