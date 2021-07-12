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
import { AddOutlined as AddOutlinedIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { rosTimeToJs } from '../utils';
import { TaskPhases } from './task-phases';
import { taskStateToStr } from './utils';
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
      '& > *': {
        borderBottom: 'unset',
      },
    },
    phasesCell: {
      padding: '0 ' + theme.spacing(1) + 'px ' + theme.spacing(1) + 'px ' + theme.spacing(1) + 'px',
      boxShadow: '' + theme.shadows[1],
      '&:last-child': {
        paddingRight: theme.spacing(1) + 'px',
      },
    },
  };
});
function TaskRow(_a) {
  var task = _a.task,
    onClick = _a.onClick;
  var classes = useStyles();
  var _b = React.useState(false),
    hover = _b[0],
    setHover = _b[1];
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
      React.createElement(
        TableCell,
        null,
        React.createElement(Typography, { variant: 'body1' }, task.task_id),
      ),
      React.createElement(
        TableCell,
        null,
        React.createElement(Typography, { variant: 'body1' }, task.robot_name),
      ),
      React.createElement(
        TableCell,
        null,
        React.createElement(Typography, { variant: 'body1' }, toRelativeDate(task.start_time)),
      ),
      React.createElement(
        TableCell,
        null,
        React.createElement(Typography, { variant: 'body1' }, toRelativeDate(task.end_time)),
      ),
      React.createElement(
        TableCell,
        null,
        React.createElement(Typography, { variant: 'body1' }, taskStateToStr(task.state)),
      ),
    ),
    React.createElement(
      TableRow,
      {
        className: clsx(hover && classes.taskRowHover),
        onClick: onClick,
        onMouseOver: function () {
          return setHover(true);
        },
        onMouseOut: function () {
          return setHover(false);
        },
      },
      React.createElement(
        TableCell,
        { className: classes.phasesCell, colSpan: 5 },
        React.createElement(TaskPhases, { taskSummary: task }),
      ),
    ),
  );
}
var toRelativeDate = function (rosTime) {
  return formatDistanceToNow(rosTimeToJs(rosTime), { addSuffix: true });
};
export function TaskTable(_a) {
  var tasks = _a.tasks,
    paginationOptions = _a.paginationOptions,
    onCreateTaskClick = _a.onCreateTaskClick,
    onTaskClick = _a.onTaskClick,
    onRefreshClick = _a.onRefreshClick,
    paperProps = __rest(_a, [
      'tasks',
      'paginationOptions',
      'onCreateTaskClick',
      'onTaskClick',
      'onRefreshClick',
    ]);
  var classes = useStyles();
  return React.createElement(
    Paper,
    __assign({}, paperProps),
    React.createElement(
      Toolbar,
      null,
      React.createElement(Typography, { className: classes.title, variant: 'h5' }, 'Tasks'),
      React.createElement(
        IconButton,
        { onClick: onRefreshClick, 'aria-label': 'Refresh' },
        React.createElement(RefreshIcon, null),
      ),
      React.createElement(
        IconButton,
        { onClick: onCreateTaskClick, 'aria-label': 'Create Task' },
        React.createElement(AddOutlinedIcon, null),
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
            React.createElement(TableCell, null, 'Task Id'),
            React.createElement(TableCell, null, 'Assignee'),
            React.createElement(TableCell, null, 'Start Time'),
            React.createElement(TableCell, null, 'End Time'),
            React.createElement(TableCell, null, 'State'),
          ),
        ),
        React.createElement(
          TableBody,
          null,
          tasks.map(function (task) {
            return React.createElement(TaskRow, {
              key: task.task_id,
              task: task,
              onClick: function (ev) {
                return onTaskClick && onTaskClick(ev, task);
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
