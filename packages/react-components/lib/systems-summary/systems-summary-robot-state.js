import React from 'react';
import { makeStyles, Typography, Grid, Paper, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
var useStyles = makeStyles(function (theme) {
  return {
    paper: {
      padding: theme.spacing(0.2),
    },
    warning: {
      color: theme.palette.error.main,
      border: '2px solid ' + theme.palette.error.main,
    },
    operational: {
      color: theme.palette.success.main,
      border: '2px solid ' + theme.palette.success.main,
    },
    idle: {
      color: theme.palette.warning.main,
      border: '2px solid ' + theme.palette.warning.main,
    },
    charging: {
      color: theme.palette.info.main,
      border: '2px solid ' + theme.palette.info.main,
    },
    headerGrid: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      padding: 0,
    },
    robotGrid: {
      marginTop: theme.spacing(1),
    },
  };
});
export var RobotSummaryState = function (props) {
  var classes = useStyles();
  var item = props.item,
    robotSummary = props.robotSummary,
    onClick = props.onClick;
  var totalItem = robotSummary.operational + robotSummary.spoiltRobots.length;
  var operationalItem = robotSummary.operational;
  var getOperationalStatusLabel = function (total, operational) {
    if (total === operational) {
      return classes.paper + ' ' + classes.operational;
    } else {
      return classes.paper + ' ' + classes.warning;
    }
  };
  var getOtherStatusLabel = function (mode) {
    switch (mode) {
      case 'idle':
        return classes.paper + ' ' + classes.idle;
      case 'charging':
        return classes.paper + ' ' + classes.charging;
      default:
        return '';
    }
  };
  return React.createElement(
    Grid,
    { container: true, spacing: 1, direction: 'column' },
    React.createElement(
      Grid,
      { item: true, className: classes.headerGrid },
      React.createElement(Typography, { variant: 'h6' }, item),
      React.createElement(
        Button,
        { className: classes.button, disabled: !onClick, onClick: onClick },
        React.createElement(Typography, { variant: 'h6' }, 'Details '),
        React.createElement(NavigateNextIcon, null),
      ),
    ),
    React.createElement(
      Grid,
      { item: true },
      React.createElement(
        Grid,
        { container: true, justify: 'flex-start', direction: 'row' },
        React.createElement(
          Grid,
          { item: true, xs: 12 },
          React.createElement(
            Paper,
            { className: getOperationalStatusLabel(totalItem, operationalItem), elevation: 3 },
            React.createElement(
              Typography,
              { noWrap: true, align: 'center', variant: 'h6', 'aria-label': item + '-operational' },
              operationalItem + '/' + totalItem,
            ),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Operational'),
          ),
        ),
      ),
    ),
    React.createElement(
      Grid,
      { className: classes.robotGrid, item: true },
      React.createElement(
        Grid,
        { container: true, justify: 'flex-start', direction: 'row', spacing: 2 },
        React.createElement(
          Grid,
          { item: true, xs: 6 },
          React.createElement(
            Paper,
            { className: getOtherStatusLabel('idle'), elevation: 3 },
            React.createElement(
              Typography,
              { noWrap: true, align: 'center', variant: 'h6', 'aria-label': item + '-idle' },
              robotSummary.idle,
            ),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Idle'),
          ),
        ),
        React.createElement(
          Grid,
          { item: true, xs: 6 },
          React.createElement(
            Paper,
            { className: getOtherStatusLabel('charging'), elevation: 3 },
            React.createElement(
              Typography,
              { noWrap: true, align: 'center', variant: 'h6', 'aria-label': item + '-charging' },
              robotSummary.charging,
            ),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Charging'),
          ),
        ),
      ),
    ),
  );
};
