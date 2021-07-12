import React from 'react';
import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { LinearProgressBar } from './linear-progress-bar';
import { CircularProgressBar } from './circular-progress-bar';
import * as RmfModels from 'rmf-models';
import { taskTypeToStr, taskStateToStr } from '../tasks/utils';
import { rosTimeToJs } from '../utils';
var useStyles = makeStyles(function (theme) {
  return createStyles({
    root: {
      '&$disabled': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
    disabled: {},
    logo: {
      maxWidth: 120,
      opacity: 1,
    },
    infoValue: {
      float: 'right',
      textAlign: 'right',
    },
  });
});
export function RobotInfo(_a) {
  var robot = _a.robot;
  var theme = useTheme();
  var classes = useStyles();
  var _b = React.useState(),
    currentTask = _b[0],
    setCurrentTask = _b[1];
  var _c = React.useState(false),
    hasConcreteEndTime = _c[0],
    setHasConcreteEndTime = _c[1];
  function returnTaskLocations(task) {
    switch (taskTypeToStr(task.task_profile.description.task_type.type)) {
      case 'Loop':
        return task.task_profile.description.loop.start_name;
      case 'Delivery':
        return task.task_profile.description.delivery.pickup_place_name;
      default:
        return '-';
    }
  }
  function returnTaskDestinations(task) {
    switch (taskTypeToStr(task.task_profile.description.task_type.type)) {
      case 'Loop':
        return task.task_profile.description.loop.finish_name;
      case 'Delivery':
        return task.task_profile.description.delivery.dropoff_place_name;
      case 'Clean':
        return task.task_profile.description.clean.start_waypoint;
      default:
        return '-';
    }
  }
  function assignedTasksToStr(robot) {
    return robot.assignedTasks
      .map(function (task, index) {
        if (index != robot.assignedTasks.length - 1) {
          return task.task_summary.task_id.concat(' → ');
        } else {
          return task.task_summary.task_id;
        }
      })
      .join('');
  }
  React.useEffect(
    function () {
      var concreteTasks = [
        RmfModels.TaskSummary.STATE_CANCELED,
        RmfModels.TaskSummary.STATE_COMPLETED,
        RmfModels.TaskSummary.STATE_FAILED,
      ];
      if (robot.assignedTasks.length > 0) {
        var tasks = robot.assignedTasks;
        var isActive = false;
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].progress !== '0%') {
            isActive = true;
            setCurrentTask(robot.assignedTasks[i]);
            break;
          }
        }
        if (!isActive) setCurrentTask(robot.assignedTasks[0]);
        if (currentTask) {
          setHasConcreteEndTime(concreteTasks.includes(currentTask.task_summary.state));
        }
      } else {
        setCurrentTask(undefined);
        setHasConcreteEndTime(false);
      }
    },
    [currentTask, robot, setCurrentTask],
  );
  var taskDetails = React.useMemo(
    function () {
      if (currentTask) {
        var location_1 = returnTaskLocations(currentTask.task_summary);
        var destination = returnTaskDestinations(currentTask.task_summary);
        var assignedTasks = assignedTasksToStr(robot);
        return { location: location_1, destination: destination, assignedTasks: assignedTasks };
      }
    },
    [currentTask, robot],
  );
  return React.createElement(
    'div',
    null,
    React.createElement(
      Typography,
      { variant: 'h6', style: { textAlign: 'center' }, gutterBottom: true },
      robot.name,
    ),
    React.createElement(Divider, null),
    React.createElement('div', { style: { marginBottom: theme.spacing(1) } }),
    React.createElement(
      Grid,
      { container: true },
      React.createElement(
        Grid,
        { container: true, item: true, xs: 12, justify: 'center' },
        React.createElement(Typography, { variant: 'h6', gutterBottom: true }, 'Battery'),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 12 },
        React.createElement(LinearProgressBar, { value: robot.battery_percent }),
      ),
      React.createElement(
        Grid,
        { container: true, item: true, xs: 12, justify: 'center' },
        React.createElement(Typography, { variant: 'h6', gutterBottom: true }, 'Assigned Tasks'),
      ),
      React.createElement(
        Grid,
        { container: true, item: true, xs: 12, justify: 'center' },
        React.createElement(
          Button,
          {
            disableElevation: true,
            variant: 'outlined',
            classes: { root: classes.root, disabled: classes.disabled },
            disabled: true,
          },
          taskDetails ? taskDetails.assignedTasks : '-',
        ),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(Typography, { variant: 'h6', align: 'left' }, 'Location'),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(Typography, { variant: 'h6', align: 'left' }, 'Destination'),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(
          Button,
          {
            size: 'small',
            disableElevation: true,
            variant: 'outlined',
            classes: { root: classes.root, disabled: classes.disabled },
            disabled: true,
          },
          taskDetails ? taskDetails.location : '-',
        ),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(
          Button,
          {
            size: 'small',
            disableElevation: true,
            variant: 'outlined',
            classes: { root: classes.root, disabled: classes.disabled },
            disabled: true,
          },
          taskDetails ? taskDetails.destination : '-',
        ),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(Typography, { variant: 'h6', align: 'left' }, 'Task Progress'),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(
          Typography,
          { variant: 'h6', align: 'left' },
          React.createElement('span', null, !hasConcreteEndTime && 'Est. ', 'End Time'),
        ),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        currentTask &&
          React.createElement(
            CircularProgressBar,
            { progress: parseInt(currentTask.progress), strokeColor: '#20a39e' },
            React.createElement(Typography, { variant: 'h6' }, currentTask.progress),
            React.createElement(
              Typography,
              { variant: 'h6' },
              currentTask ? taskStateToStr(currentTask.task_summary.state) : '-',
            ),
          ),
        !currentTask &&
          React.createElement(
            Button,
            {
              size: 'small',
              disableElevation: true,
              variant: 'outlined',
              classes: { root: classes.root, disabled: classes.disabled },
              disabled: true,
            },
            '-',
          ),
      ),
      React.createElement(
        Grid,
        { item: true, xs: 6 },
        React.createElement(
          Button,
          {
            size: 'small',
            disableElevation: true,
            variant: 'outlined',
            classes: { root: classes.root, disabled: classes.disabled },
            disabled: true,
          },
          currentTask ? rosTimeToJs(currentTask.task_summary.end_time).toLocaleTimeString() : '-',
        ),
      ),
    ),
  );
}
