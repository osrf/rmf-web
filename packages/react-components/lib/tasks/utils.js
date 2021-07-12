import * as RmfModels from 'rmf-models';
export function taskStateToStr(state) {
  switch (state) {
    case RmfModels.TaskSummary.STATE_ACTIVE:
      return 'Active';
    case RmfModels.TaskSummary.STATE_CANCELED:
      return 'Cancelled';
    case RmfModels.TaskSummary.STATE_COMPLETED:
      return 'Completed';
    case RmfModels.TaskSummary.STATE_FAILED:
      return 'Failed';
    case RmfModels.TaskSummary.STATE_PENDING:
      return 'Pending';
    case RmfModels.TaskSummary.STATE_QUEUED:
      return 'Queued';
    default:
      return 'Unknown';
  }
}
export function taskTypeToStr(taskType) {
  switch (taskType) {
    case RmfModels.TaskType.TYPE_CHARGE_BATTERY:
      return 'Charge';
    case RmfModels.TaskType.TYPE_CLEAN:
      return 'Clean';
    case RmfModels.TaskType.TYPE_DELIVERY:
      return 'Delivery';
    case RmfModels.TaskType.TYPE_LOOP:
      return 'Loop';
    case RmfModels.TaskType.TYPE_PATROL:
      return 'Patrol';
    case RmfModels.TaskType.TYPE_STATION:
      return 'Station';
    default:
      return 'Unknown';
  }
}
/* istanbul ignore next */
function checkField(obj, field, type) {
  if (!Object.prototype.hasOwnProperty.call(obj, field) || typeof obj[field] !== type) {
    throw new TypeError('expected [' + field + '] to be [' + type + ']');
  }
}
// TODO: See if we can generate validators from the schema.
/* istanbul ignore next */
export function parseTasksFile(contents) {
  var tasks = JSON.parse(contents);
  if (!Array.isArray(tasks)) {
    throw new TypeError('expected an array');
  }
  for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
    var t = tasks_1[_i];
    if (typeof t !== 'object') {
      throw new TypeError('expected object');
    }
    checkField(t, 'task_type', 'number');
    checkField(t, 'start_time', 'number');
    checkField(t, 'priority', 'number');
    checkField(t, 'description', 'object');
    var desc = t['description'];
    switch (t['task_type']) {
      case RmfModels.TaskType.TYPE_CLEAN:
        checkField(desc, 'cleaning_zone', 'string');
        break;
      case RmfModels.TaskType.TYPE_DELIVERY:
        checkField(desc, 'pickup_place_name', 'string');
        checkField(desc, 'pickup_dispenser', 'string');
        checkField(desc, 'dropoff_ingestor', 'string');
        checkField(desc, 'dropoff_place_name', 'string');
        break;
      case RmfModels.TaskType.TYPE_LOOP:
        checkField(desc, 'num_loops', 'number');
        checkField(desc, 'start_name', 'string');
        checkField(desc, 'finish_name', 'string');
        break;
      default:
        throw new TypeError('unknown task_type');
    }
  }
  return tasks;
}
