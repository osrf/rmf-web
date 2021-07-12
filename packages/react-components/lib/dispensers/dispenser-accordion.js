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
import * as RmfModels from 'rmf-models';
import { ErrorOverlay } from '../error-overlay';
import ItemAccordionDetails from '../item-accordion-details';
import ItemAccordionSummary from '../item-accordion-summary';
import { SimpleInfo } from '../simple-info';
var debug = Debug('Dispensers:DispenserAccordion');
var DispenserInfo = function (props) {
  var dispenser = props.dispenser,
    overrideStyle = props.overrideStyle;
  var data = [
    { name: 'Name', value: dispenser.guid },
    { name: 'No. Queued Requests', value: dispenser.request_guid_queue.length },
    {
      name: 'Request Queue ID',
      value: dispenser.request_guid_queue.length ? dispenser.request_guid_queue : 'Unknown',
      disabled: !!dispenser.request_guid_queue.length,
    },
    { name: 'Seconds Remaining', value: dispenser.seconds_remaining },
  ];
  return React.createElement(SimpleInfo, {
    infoData: data,
    overrideStyle: overrideStyle ? overrideStyle : undefined,
  });
};
function dispenserModeToString(mode) {
  switch (mode) {
    case RmfModels.DispenserState.IDLE:
      return 'IDLE';
    case RmfModels.DispenserState.BUSY:
      return 'ONLINE';
    case RmfModels.DispenserState.OFFLINE:
      return 'OFFLINE';
    default:
      return 'N/A';
  }
}
var useStyles = makeStyles(function (theme) {
  return {
    statusLabelIdle: { borderColor: theme.palette.warning.main },
    statusLabelBusy: { borderColor: theme.palette.success.main },
    statusLabelOffline: { borderColor: theme.palette.error.main },
    typography: {
      padding: '1rem',
    },
  };
});
var overrideStyles = makeStyles(function () {
  return {
    container: {
      display: 'table',
      borderCollapse: 'collapse',
      width: '100%',
      overflowX: 'auto',
      userSelect: 'none',
    },
  };
});
export var DispenserAccordion = React.forwardRef(function (props, ref) {
  var dispenserState = props.dispenserState,
    dispenser = props.dispenser,
    otherProps = __rest(props, ['dispenserState', 'dispenser']);
  debug('render ' + dispenser);
  var classes = useStyles();
  var overrideClasses = overrideStyles();
  // TODO: refactor this into a common custom hook to handle stored state
  // in future if we need it to track the states of other items.
  function usePrevDispenserState(dispenserState) {
    var ref = React.useRef(null);
    React.useEffect(function () {
      if (dispenserState) {
        ref.current = dispenserState;
      }
    });
    return ref.current;
  }
  var previousState = usePrevDispenserState(dispenserState);
  // end of TODO
  var getStatusLabelClass = function () {
    switch (dispenserState === null || dispenserState === void 0 ? void 0 : dispenserState.mode) {
      case RmfModels.DispenserState.IDLE:
        return classes.statusLabelIdle;
      case RmfModels.DispenserState.BUSY:
        return classes.statusLabelBusy;
      case RmfModels.DispenserState.OFFLINE:
        return classes.statusLabelOffline;
      default:
        return null;
    }
  };
  var statusLabelClass = getStatusLabelClass();
  return React.createElement(
    Accordion,
    __assign({ ref: ref }, otherProps),
    React.createElement(ItemAccordionSummary, {
      title: dispenserState ? dispenserState.guid : dispenser,
      statusProps: {
        className: statusLabelClass ? statusLabelClass : undefined,
        text: dispenserState ? dispenserModeToString(dispenserState.mode) : 'UNKNOWN',
        variant: statusLabelClass ? 'normal' : 'unknown',
      },
    }),
    React.createElement(
      ItemAccordionDetails,
      null,
      React.createElement(
        ErrorOverlay,
        {
          errorMsg: !dispenserState
            ? 'Dispenser is not sending states. Please check if it is working properly.'
            : null,
        },
        React.createElement(
          React.Fragment,
          null,
          dispenserState && React.createElement(DispenserInfo, { dispenser: dispenserState }),
          !dispenserState &&
            previousState &&
            React.createElement(DispenserInfo, {
              dispenser: previousState,
              overrideStyle: overrideClasses,
            }),
        ),
      ),
    ),
  );
});
export default DispenserAccordion;
