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
import { Accordion, makeStyles } from '@material-ui/core';
import Debug from 'debug';
import React from 'react';
import ItemAccordionDetails from '../item-accordion-details';
import ItemAccordionSummary from '../item-accordion-summary';
import { SimpleInfo } from '../simple-info';
import { robotModeToString } from './utils';
var debug = Debug('Robots:RobotAccordion');
var useStyles = makeStyles(function (theme) {
  return {
    robotStatusLabel: {
      borderColor: theme.palette.info.main,
    },
  };
});
var RobotInfo = function (props) {
  var fleetName = props.fleetName,
    robot = props.robot;
  var data = [
    { name: 'Name', value: robot.name },
    { name: 'Model', value: robot.model },
    { name: 'Fleet', value: fleetName },
    {
      name: 'Location',
      value:
        robot.location.level_name +
        ' (' +
        robot.location.x.toFixed(3) +
        ', ' +
        robot.location.y.toFixed(3) +
        ')',
    },
    { name: 'Yaw', value: robot.location.yaw.toFixed(3) },
    { name: 'Task Id', value: robot.task_id },
    { name: 'Battery', value: robot.battery_percent.toFixed(0) },
  ];
  return React.createElement(SimpleInfo, { infoData: data });
};
export var RobotAccordion = React.forwardRef(function (props, ref) {
  var fleetName = props.fleetName,
    robot = props.robot,
    otherProps = __rest(props, ['fleetName', 'robot']);
  debug('render ' + robot.name);
  var classes = useStyles();
  return React.createElement(
    Accordion,
    __assign({ ref: ref }, otherProps),
    React.createElement(ItemAccordionSummary, {
      title: robot.name,
      statusProps: {
        className: classes.robotStatusLabel,
        text: robotModeToString(robot.mode),
      },
    }),
    React.createElement(
      ItemAccordionDetails,
      null,
      React.createElement(RobotInfo, { fleetName: fleetName, robot: robot }),
    ),
  );
});
export default RobotAccordion;
