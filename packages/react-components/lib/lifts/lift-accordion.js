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
import Debug from 'debug';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { AntTab, AntTabs, TabPanel } from '../ant-tab';
import ItemAccordionDetails from '../item-accordion-details';
import ItemAccordionSummary from '../item-accordion-summary';
import { SimpleInfo } from '../simple-info';
import LiftRequestForm from './lift-request-form';
import {
  doorStateToString,
  liftModeToString,
  motionStateToString,
  requestDoorModes,
  requestModes,
} from './lift-utils';
var debug = Debug('Lifts:Accordion');
var useStyles = makeStyles(function (theme) {
  return {
    liftFloorLabelStopped: {
      borderColor: theme.palette.info.main,
    },
    liftFloorLabelMoving: {
      borderColor: theme.palette.warning.main,
    },
    noPadding: {
      padding: 0,
    },
  };
});
export var LiftInfo = function (props) {
  var lift = props.lift,
    liftState = props.liftState,
    otherProps = __rest(props, ['lift', 'liftState']);
  var data = [
    { name: 'Name', value: lift.name },
    { name: 'Location', value: '(' + lift.ref_x.toFixed(3) + ', ' + lift.ref_y.toFixed(3) + ')' },
    { name: 'Destination Floor', value: liftState ? liftState.destination_floor : 'Unknown' },
    { name: 'Available Floors', value: lift.levels },
    {
      name: 'Current Mode',
      value: liftState ? liftModeToString(liftState.current_mode) : 'Unknown',
      disabled: !liftState,
    },
    {
      name: 'Available Modes',
      value: liftState
        ? Array.from(liftState.available_modes).map(function (mode) {
            return liftModeToString(mode);
          })
        : 'Unknown',
      disabled: !liftState,
    },
    {
      name: 'Door State',
      value: liftState ? doorStateToString(liftState.door_state) : 'Unknown',
      disabled: !liftState,
    },
    {
      name: 'Motion State',
      value: liftState ? motionStateToString(liftState.motion_state) : 'Unknown',
      disabled: !liftState,
    },
  ];
  return React.createElement(SimpleInfo, __assign({ infoData: data }, otherProps));
};
export var LiftAccordion = React.forwardRef(function (props, ref) {
  var lift = props.lift,
    liftState = props.liftState,
    onRequestSubmit = props.onRequestSubmit,
    otherProps = __rest(props, ['lift', 'liftState', 'onRequestSubmit']);
  debug('render ' + lift.name);
  var _a = React.useState(0),
    tabValue = _a[0],
    setTabValue = _a[1];
  var classes = useStyles();
  var liftFloorLabelClass = React.useCallback(
    function (liftState) {
      if (!liftState) {
        return null;
      }
      switch (liftState.motion_state) {
        case RmfModels.LiftState.MOTION_UP:
        case RmfModels.LiftState.MOTION_DOWN:
          return classes.liftFloorLabelMoving;
        case RmfModels.LiftState.MOTION_STOPPED:
          return classes.liftFloorLabelStopped;
        default:
          return null;
      }
    },
    [classes],
  );
  var handleTabChange = React.useCallback(function (_event, newValue) {
    setTabValue(newValue);
  }, []);
  var liftStatusClass = liftFloorLabelClass(liftState);
  return React.createElement(
    Accordion,
    __assign({ ref: ref }, otherProps),
    React.createElement(ItemAccordionSummary, {
      title: lift.name,
      statusProps: {
        className: liftStatusClass ? liftStatusClass : undefined,
        text: liftState === null || liftState === void 0 ? void 0 : liftState.current_floor,
        variant: liftState ? 'normal' : 'unknown',
      },
    }),
    React.createElement(
      ItemAccordionDetails,
      null,
      React.createElement(
        AntTabs,
        { variant: 'fullWidth', value: tabValue, onChange: handleTabChange },
        React.createElement(AntTab, { label: 'Info' }),
        React.createElement(AntTab, { label: 'Request' }),
      ),
      React.createElement(
        TabPanel,
        { value: tabValue, index: 0, fullWidth: true },
        React.createElement(LiftInfo, {
          className: classes.noPadding,
          lift: lift,
          liftState: liftState,
        }),
      ),
      React.createElement(
        TabPanel,
        { value: tabValue, index: 1 },
        lift.levels &&
          React.createElement(LiftRequestForm, {
            lift: lift,
            availableDoorModes: requestDoorModes,
            availableRequestTypes: requestModes,
            onRequestSubmit: onRequestSubmit,
          }),
      ),
    ),
  );
});
export default LiftAccordion;
