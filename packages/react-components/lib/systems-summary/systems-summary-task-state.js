import React from 'react';
import { makeStyles, Typography, Grid, Paper } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
  return {
    gridWithClick: {
      padding: '0.4rem 0',
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
        cursor: 'pointer',
      },
    },
    grid: {
      padding: '0.4rem 0',
    },
    normal: {
      color: theme.palette.success.main,
      border: '2px solid ' + theme.palette.success.main,
    },
    failed: {
      color: theme.palette.error.main,
      border: '2px solid ' + theme.palette.error.main,
    },
    queue: {
      color: theme.palette.info.main,
      border: '2px solid ' + theme.palette.info.main,
    },
    header: {
      marginBottom: '0.5rem',
    },
  };
});
export var SystemSummaryTaskState = function (props) {
  var classes = useStyles();
  var tasks = props.tasks,
    onClick = props.onClick;
  var getTaskSummary = function () {
    var modeCounter = { active: 0, finish: 0, failed: 0, queued: 0 };
    tasks.forEach(function (task) {
      switch (task.state) {
        case 0:
          modeCounter['queued'] += 1;
          break;
        case 1:
          modeCounter['active'] += 1;
          break;
        case 2:
          modeCounter['finish'] += 1;
          break;
        case 3:
          modeCounter['failed'] += 1;
          break;
      }
    });
    return modeCounter;
  };
  var getStatusLabel = function (mode) {
    switch (mode) {
      case 'active':
      case 'finish':
        return classes.normal;
      case 'queued':
        return classes.queue;
      case 'failed':
        return classes.failed;
      default:
        return '';
    }
  };
  var summary = getTaskSummary();
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Typography, { className: classes.header, variant: 'body1' }, 'Plans'),
    React.createElement(
      'div',
      { 'aria-label': 'panel', 'aria-disabled': !onClick, onClick: onClick },
      React.createElement(
        Grid,
        {
          className: onClick ? classes.gridWithClick : classes.grid,
          spacing: 2,
          container: true,
          direction: 'row',
        },
        React.createElement(
          Grid,
          { item: true, xs: 3 },
          React.createElement(
            Paper,
            { elevation: 3, className: getStatusLabel('active') },
            React.createElement(Typography, { align: 'center', variant: 'h6' }, summary.active),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Active'),
          ),
        ),
        React.createElement(
          Grid,
          { item: true, xs: 3 },
          React.createElement(
            Paper,
            { elevation: 3, className: getStatusLabel('finish') },
            React.createElement(Typography, { align: 'center', variant: 'h6' }, summary.finish),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Finish'),
          ),
        ),
        React.createElement(
          Grid,
          { item: true, xs: 3 },
          React.createElement(
            Paper,
            { elevation: 3, className: getStatusLabel('queued') },
            React.createElement(Typography, { align: 'center', variant: 'h6' }, summary.queued),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Queued'),
          ),
        ),
        React.createElement(
          Grid,
          { item: true, xs: 3 },
          React.createElement(
            Paper,
            { elevation: 3, className: getStatusLabel('failed') },
            React.createElement(Typography, { align: 'center', variant: 'h6' }, summary.failed),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Failed'),
          ),
        ),
      ),
    ),
  );
};
