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
import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Debug from 'debug';
import React from 'react';
import * as RmfModels from 'rmf-models';
import ItemAccordionDetails from '../item-accordion-details';
import ItemAccordionSummary from '../item-accordion-summary';
import { SimpleInfo } from '../simple-info';
var debug = Debug('Doors:DoorAccordion');
var useStyles = makeStyles(function (theme) {
  return {
    controlButtonGroup: {
      marginTop: theme.spacing(1),
    },
    doorLabelOpen: {
      borderColor: theme.palette.success.main,
    },
    doorLabelClosed: {
      borderColor: theme.palette.error.main,
    },
    doorLabelMoving: {
      borderColor: theme.palette.warning.main,
    },
  };
});
function doorTypeToString(doorType) {
  switch (doorType) {
    case RmfModels.Door.DOOR_TYPE_DOUBLE_SLIDING:
      return 'Double Sliding';
    case RmfModels.Door.DOOR_TYPE_DOUBLE_SWING:
      return 'Double Swing';
    case RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE:
      return 'Double Telescope';
    case RmfModels.Door.DOOR_TYPE_SINGLE_SLIDING:
      return 'Single Sliding';
    case RmfModels.Door.DOOR_TYPE_SINGLE_SWING:
      return 'Single Swing';
    case RmfModels.Door.DOOR_TYPE_SINGLE_TELESCOPE:
      return 'Single Telescope';
    default:
      return 'Unknown (' + doorType + ')';
  }
}
function doorModeToString(doorState) {
  if (!doorState) {
    return 'N/A';
  }
  switch (doorState.current_mode.value) {
    case RmfModels.DoorMode.MODE_OPEN:
      return 'OPEN';
    case RmfModels.DoorMode.MODE_CLOSED:
      return 'CLOSED';
    case RmfModels.DoorMode.MODE_MOVING:
      return 'MOVING';
    default:
      return 'N/A';
  }
}
function motionDirectionToString(motionDirection) {
  switch (motionDirection) {
    case 1:
      return 'Clockwise';
    case -1:
      return 'Anti-Clockwise';
    default:
      return 'Unknown (' + motionDirection + ')';
  }
}
var DoorInfo = function (props) {
  var door = props.door;
  var data = [
    { name: 'Name', value: door.name },
    { name: 'Type', value: doorTypeToString(door.door_type) },
    { name: 'Motion Direction', value: motionDirectionToString(door.motion_direction) },
    { name: 'Motion Range', value: door.motion_range.toFixed(3) },
    { name: 'Location', value: '(' + door.v1_x.toFixed(3) + ', ' + door.v1_y.toFixed(3) + ')' },
  ];
  return React.createElement(SimpleInfo, { infoData: data });
};
export var DoorAccordion = React.forwardRef(function (props, ref) {
  var door = props.door,
    doorState = props.doorState,
    onDoorControlClick = props.onDoorControlClick,
    otherProps = __rest(props, ['door', 'doorState', 'onDoorControlClick']);
  debug('render ' + door.name);
  var classes = useStyles();
  var doorModeLabelClasses = React.useCallback(
    function (doorState) {
      if (!doorState) {
        return null;
      }
      switch (doorState.current_mode.value) {
        case RmfModels.DoorMode.MODE_OPEN:
          return '' + classes.doorLabelOpen;
        case RmfModels.DoorMode.MODE_CLOSED:
          return '' + classes.doorLabelClosed;
        case RmfModels.DoorMode.MODE_MOVING:
          return '' + classes.doorLabelMoving;
        default:
          return null;
      }
    },
    [classes],
  );
  var doorStatusClass = doorModeLabelClasses(doorState);
  return React.createElement(
    Accordion,
    __assign({ ref: ref }, otherProps),
    React.createElement(ItemAccordionSummary, {
      title: door.name,
      statusProps: {
        className: doorStatusClass ? doorStatusClass : undefined,
        text: doorModeToString(doorState),
        variant: doorState ? 'normal' : 'unknown',
      },
    }),
    React.createElement(
      ItemAccordionDetails,
      null,
      React.createElement(DoorInfo, { door: door }),
      onDoorControlClick &&
        React.createElement(
          ButtonGroup,
          { className: classes.controlButtonGroup, fullWidth: true },
          React.createElement(
            Button,
            {
              onClick: function (ev) {
                return onDoorControlClick(ev, door, RmfModels.DoorMode.MODE_CLOSED);
              },
            },
            'Close',
          ),
          React.createElement(
            Button,
            {
              onClick: function (ev) {
                return onDoorControlClick(ev, door, RmfModels.DoorMode.MODE_OPEN);
              },
            },
            'Open',
          ),
        ),
    ),
  );
});
export default DoorAccordion;
