import React from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
  return {
    paper: {
      padding: theme.spacing(1),
      margin: '1rem 0',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.grey[100],
      },
    },
  };
});
export var SystemSummarySpoiltItems = function (props) {
  var classes = useStyles();
  var doors = props.doors,
    lifts = props.lifts,
    robots = props.robots,
    dispensers = props.dispensers,
    onClickSpoiltDoor = props.onClickSpoiltDoor,
    onClickSpoiltDispenser = props.onClickSpoiltDispenser,
    onClickSpoiltLift = props.onClickSpoiltLift,
    onClickSpoiltRobot = props.onClickSpoiltRobot;
  var spoiltItemDetails = function (name, state, error) {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Typography, { color: 'error', variant: 'body1' }, name + ' - ' + state),
      error !== undefined
        ? React.createElement(Typography, { color: 'error', variant: 'body1' }, 'Error - ', error)
        : null,
    );
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Typography, { color: 'error', variant: 'h6' }, 'Equipment Out Of Order'),
    doors.length > 0
      ? doors.map(function (item) {
          return React.createElement(
            Paper,
            {
              onClick: function () {
                return onClickSpoiltDoor && onClickSpoiltDoor(item.door);
              },
              className: classes.paper,
              key: 'door-' + item.name + '-' + item.state,
              elevation: 3,
            },
            spoiltItemDetails(item.name, item.state),
          );
        })
      : null,
    lifts.length > 0
      ? lifts.map(function (item) {
          return React.createElement(
            Paper,
            {
              onClick: function () {
                return onClickSpoiltLift && onClickSpoiltLift(item.lift);
              },
              className: classes.paper,
              key: 'lift-' + item.name + '-' + item.state,
              elevation: 3,
            },
            spoiltItemDetails(item.name, item.state),
          );
        })
      : null,
    dispensers.length > 0
      ? dispensers.map(function (item) {
          return React.createElement(
            Paper,
            {
              onClick: function () {
                return onClickSpoiltDispenser && onClickSpoiltDispenser(item.dispenser);
              },
              className: classes.paper,
              key: 'dispenser-' + item.name + '-' + item.state,
              elevation: 3,
            },
            spoiltItemDetails(item.name, item.state),
          );
        })
      : null,
    robots.length > 0
      ? robots.map(function (item) {
          return React.createElement(
            Paper,
            {
              onClick: function () {
                return onClickSpoiltRobot && onClickSpoiltRobot(item.fleet, item.robot);
              },
              className: classes.paper,
              key: 'robot-' + item.name + '-' + item.state,
              elevation: 3,
            },
            spoiltItemDetails(item.name, item.state),
          );
        })
      : null,
  );
};
