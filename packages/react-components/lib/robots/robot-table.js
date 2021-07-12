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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { taskTypeToStr } from '../tasks/utils';
import { robotModeToString } from './utils';
var useStyles = makeStyles(function (theme) {
  return {
    table: {
      minWidth: 650,
    },
    title: {
      flex: '1 1 100%',
    },
    taskRowHover: {
      background: theme.palette.action.hover,
    },
    infoRow: {
      boxShadow: '' + theme.shadows[1],
      '& > *': {
        borderBottom: 'unset',
      },
    },
  };
});
var returnLocationCells = function (robot) {
  var taskDescription = robot.assignedTasks[0].task_summary.task_profile.description;
  switch (taskTypeToStr(taskDescription.task_type.type)) {
    case 'Loop':
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(TableCell, null, taskDescription.loop.start_name),
        React.createElement(TableCell, null, taskDescription.loop.finish_name),
      );
    case 'Delivery':
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(TableCell, null, taskDescription.delivery.pickup_place_name),
        React.createElement(TableCell, null, taskDescription.delivery.dropoff_place_name),
      );
    case 'Clean':
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(TableCell, null, 'NA'),
        React.createElement(TableCell, null, taskDescription.clean.start_waypoint),
      );
    default:
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(TableCell, null, '-'),
        React.createElement(TableCell, null, '-'),
      );
  }
};
function RobotRow(_a) {
  var robot = _a.robot,
    onClick = _a.onClick;
  var classes = useStyles();
  var _b = React.useState(false),
    hover = _b[0],
    setHover = _b[1];
  if (robot.assignedTasks.length == 0) {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        TableRow,
        {
          className: clsx(classes.infoRow, hover && classes.taskRowHover),
          onClick: onClick,
          onMouseOver: function () {
            return setHover(true);
          },
          onMouseOut: function () {
            return setHover(false);
          },
        },
        React.createElement(TableCell, null, robot.name),
        React.createElement(TableCell, null, '-'),
        React.createElement(TableCell, null, '-'),
        React.createElement(TableCell, null, '-'),
        React.createElement(TableCell, null, Math.round(robot.battery_percent), '%'),
        React.createElement(TableCell, null, robotModeToString(robot.mode)),
      ),
    );
  } else {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        TableRow,
        {
          className: clsx(classes.infoRow, hover && classes.taskRowHover),
          onClick: onClick,
          onMouseOver: function () {
            return setHover(true);
          },
          onMouseOut: function () {
            return setHover(false);
          },
        },
        React.createElement(TableCell, null, robot.name),
        returnLocationCells(robot),
        React.createElement(
          TableCell,
          null,
          robot.assignedTasks
            ? robot.assignedTasks[0].task_summary.end_time.sec -
                robot.assignedTasks[0].task_summary.start_time.sec +
                's'
            : '-',
        ),
        React.createElement(TableCell, null, Math.round(robot.battery_percent), '%'),
        React.createElement(TableCell, null, robotModeToString(robot.mode)),
      ),
    );
  }
}
export function RobotTable(_a) {
  var tasks = _a.tasks,
    robots = _a.robots,
    paginationOptions = _a.paginationOptions,
    robotsWithTasks = _a.robotsWithTasks,
    onRefreshTasks = _a.onRefreshTasks,
    onRobotClickAndRefresh = _a.onRobotClickAndRefresh,
    paperProps = __rest(_a, [
      'tasks',
      'robots',
      'paginationOptions',
      'robotsWithTasks',
      'onRefreshTasks',
      'onRobotClickAndRefresh',
    ]);
  var classes = useStyles();
  return React.createElement(
    Paper,
    __assign({}, paperProps),
    React.createElement(
      Toolbar,
      null,
      React.createElement(Typography, { className: classes.title, variant: 'h6' }, 'Robots'),
      React.createElement(
        IconButton,
        {
          onClick: function () {
            onRefreshTasks;
          },
          'aria-label': 'Refresh',
        },
        React.createElement(RefreshIcon, null),
      ),
    ),
    React.createElement(
      TableContainer,
      { style: { flex: '1 1 auto' } },
      React.createElement(
        Table,
        {
          className: classes.table,
          stickyHeader: true,
          size: 'small',
          style: { tableLayout: 'fixed' },
        },
        React.createElement(
          TableHead,
          null,
          React.createElement(
            TableRow,
            null,
            React.createElement(TableCell, null, 'Robot Name'),
            React.createElement(TableCell, null, 'Start Location'),
            React.createElement(TableCell, null, 'Destination'),
            React.createElement(TableCell, null, 'Active Task Duration'),
            React.createElement(TableCell, null, 'Battery'),
            React.createElement(TableCell, null, 'State'),
          ),
        ),
        React.createElement(
          TableBody,
          null,
          robotsWithTasks &&
            robotsWithTasks.map(function (robot, robot_id) {
              return React.createElement(RobotRow, {
                key: robot_id,
                robot: robot,
                onClick: function (ev) {
                  onRobotClickAndRefresh && onRobotClickAndRefresh(robot, ev);
                },
              });
            }),
        ),
      ),
    ),
    paginationOptions &&
      React.createElement(
        TablePagination,
        __assign({ component: 'div' }, paginationOptions, { style: { flex: '0 0 auto' } }),
      ),
  );
}
