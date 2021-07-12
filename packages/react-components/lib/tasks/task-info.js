import { Button, Divider, makeStyles, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { rosTimeToJs } from '../utils';
import { taskStateToStr, taskTypeToStr } from './utils';
var useStyles = makeStyles({
  infoValue: {
    float: 'right',
    textAlign: 'right',
  },
});
function InfoLine(_a) {
  var children = _a.children;
  return React.createElement(Typography, { variant: 'body1', gutterBottom: true }, children);
}
function InfoValue(_a) {
  var children = _a.children;
  var classes = useStyles();
  return React.createElement('span', { className: classes.infoValue }, children);
}
function CleanTaskInfo(_a) {
  var task = _a.task;
  return React.createElement(
    InfoLine,
    null,
    React.createElement('span', null, 'Start Waypoint:'),
    React.createElement(
      'span',
      { style: { float: 'right' } },
      task.task_profile.description.clean.start_waypoint,
    ),
  );
}
function LoopTaskInfo(_a) {
  var task = _a.task;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Start Waypoint:'),
      React.createElement(InfoValue, null, task.task_profile.description.loop.start_name),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Finish Waypoint:'),
      React.createElement(InfoValue, null, task.task_profile.description.loop.finish_name),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Num of Loops:'),
      React.createElement(InfoValue, null, task.task_profile.description.loop.num_loops),
    ),
  );
}
function DeliveryTaskInfoProps(_a) {
  var task = _a.task;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Pickup Location:'),
      React.createElement(
        'span',
        { style: { float: 'right' } },
        task.task_profile.description.delivery.pickup_place_name,
      ),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Pickup Dispenser:'),
      React.createElement(
        'span',
        { style: { float: 'right' } },
        task.task_profile.description.delivery.pickup_dispenser,
      ),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Dropoff Location:'),
      React.createElement(
        'span',
        { style: { float: 'right' } },
        task.task_profile.description.delivery.dropoff_place_name,
      ),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Dropoff Ingestor:'),
      React.createElement(
        'span',
        { style: { float: 'right' } },
        task.task_profile.description.delivery.dropoff_ingestor,
      ),
    ),
  );
}
export function TaskInfo(_a) {
  var task = _a.task,
    onCancelTaskClick = _a.onCancelTaskClick;
  var theme = useTheme();
  var taskType = task.task_profile.description.task_type.type;
  var hasConcreteEndTime = [
    RmfModels.TaskSummary.STATE_CANCELED,
    RmfModels.TaskSummary.STATE_COMPLETED,
    RmfModels.TaskSummary.STATE_FAILED,
  ].includes(task.state);
  var detailInfo = (function () {
    switch (taskType) {
      case RmfModels.TaskType.TYPE_CLEAN:
        return React.createElement(CleanTaskInfo, { task: task });
      case RmfModels.TaskType.TYPE_LOOP:
        return React.createElement(LoopTaskInfo, { task: task });
      case RmfModels.TaskType.TYPE_DELIVERY:
        return React.createElement(DeliveryTaskInfoProps, { task: task });
      default:
        return null;
    }
  })();
  var taskCancellable =
    task.state === RmfModels.TaskSummary.STATE_ACTIVE ||
    task.state === RmfModels.TaskSummary.STATE_PENDING ||
    task.state === RmfModels.TaskSummary.STATE_QUEUED;
  return React.createElement(
    'div',
    null,
    React.createElement(
      Typography,
      { variant: 'h6', style: { textAlign: 'center' }, gutterBottom: true },
      task.task_id,
    ),
    React.createElement(Divider, null),
    React.createElement('div', { style: { marginBottom: theme.spacing(1) } }),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Task Type:'),
      React.createElement(InfoValue, null, taskTypeToStr(taskType)),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Priority:'),
      React.createElement(InfoValue, null, task.task_profile.description.priority.value),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Assigned Robot:'),
      React.createElement(InfoValue, null, task.robot_name),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'Start Time:'),
      React.createElement(InfoValue, null, rosTimeToJs(task.start_time).toLocaleString()),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, !hasConcreteEndTime && 'Est. ', 'End Time:'),
      React.createElement(InfoValue, null, rosTimeToJs(task.end_time).toLocaleString()),
    ),
    React.createElement(
      InfoLine,
      null,
      React.createElement('span', null, 'State:'),
      React.createElement(InfoValue, null, taskStateToStr(task.state)),
    ),
    detailInfo,
    React.createElement(
      Button,
      {
        style: { marginTop: theme.spacing(1) },
        fullWidth: true,
        variant: 'contained',
        color: 'secondary',
        'aria-label': 'Cancel Task',
        onClick: onCancelTaskClick,
        disabled: !taskCancellable,
      },
      'Cancel Task',
    ),
  );
}
