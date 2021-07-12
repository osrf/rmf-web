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
import Debug from 'debug';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { DoorMarker, fromRmfYaw } from '..';
import { fromRmfCoords, radiansToDegrees } from '../geometry-utils';
var debug = Debug('Lifts:LiftMarker');
// Gets the text to insert to the lift, the text depend on the current mode, motion state and the
// current and destination floor of the lift.
function getLiftModeText(liftState) {
  if (!liftState.current_mode) {
    return 'UNKNOWN';
  }
  switch (liftState.current_mode) {
    case RmfModels.LiftState.MODE_FIRE:
      return 'FIRE!';
    case RmfModels.LiftState.MODE_EMERGENCY:
      return 'EMERGENCY!';
    case RmfModels.LiftState.MODE_OFFLINE:
      return 'OFFLINE';
    default:
      return 'NORMAL';
  }
}
function getLiftMotionText(liftState) {
  switch (liftState.motion_state) {
    case RmfModels.LiftState.MOTION_UP:
      return '▲';
    case RmfModels.LiftState.MOTION_DOWN:
      return '▼';
    case RmfModels.LiftState.MOTION_STOPPED:
      return '⯀';
    default:
      return '?';
  }
}
var useStyles = makeStyles({
  marker: {
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
  lift: {
    strokeWidth: '0.2',
  },
  text: {
    dominantBaseline: 'central',
    textAnchor: 'middle',
    fontSize: '0.16px',
    fontWeight: 'bold',
    cursor: 'inherit',
    userSelect: 'none',
  },
});
export var useLiftMarkerStyles = makeStyles({
  onCurrentFloor: {
    fill: 'green',
    opacity: '70%',
  },
  moving: {
    fill: 'grey',
    opacity: '70%',
  },
  unknown: {
    fill: '#3d3c3c',
    opacity: '80%',
  },
  emergency: {
    fill: 'red',
    opacity: '80%',
  },
  fire: {
    fill: '#ff562a',
    opacity: '80%',
  },
  offLine: {
    fill: 'yellow',
    opacity: '80%',
  },
  human: {
    fill: '#90dfef',
    opacity: '80%',
  },
});
function toDoorMode(liftState) {
  // LiftState uses its own enum definition of door state/mode which is separated from DoorMode.
  // But their definitions are equal so we can skip conversion.
  return { value: liftState.door_state };
}
export var LiftMarker = React.forwardRef(function (props, ref) {
  var lift = props.lift,
    liftState = props.liftState,
    variant = props.variant,
    _a = props.translate,
    translate = _a === void 0 ? true : _a,
    onClick = props.onClick,
    otherProps = __rest(props, ['lift', 'liftState', 'variant', 'translate', 'onClick']);
  debug('render ' + lift.name);
  var width = lift.width,
    depth = lift.depth,
    ref_x = lift.ref_x,
    ref_y = lift.ref_y,
    ref_yaw = lift.ref_yaw,
    doors = lift.doors;
  var pos = fromRmfCoords([ref_x, ref_y]);
  // Get properties from lift state
  var doorMode = liftState ? toDoorMode(liftState) : undefined;
  var classes = useStyles();
  var markerClasses = useLiftMarkerStyles();
  var markerClass = variant ? markerClasses[variant] : markerClasses.onCurrentFloor;
  /**
   * In order to keep consistent spacing, we render at a "unit box" scale it according to the
   * dimensionals of the lift.
   */
  var renderStatusText = function () {
    // QN: do we need to take into account rotation?
    var textScale = Math.min(width, depth); // keep aspect ratio
    return liftState
      ? React.createElement(
          'text',
          { className: classes.text, transform: 'scale(' + textScale + ')' },
          React.createElement('tspan', { x: '0', dy: '-1.8em' }, liftState.current_floor),
          React.createElement(
            'tspan',
            { x: '0', dy: '1.2em', fontSize: '0.7em' },
            getLiftModeText(liftState),
          ),
          React.createElement(
            'tspan',
            { x: '0', dy: '0.6em', fontSize: '3em' },
            getLiftMotionText(liftState),
          ),
        )
      : React.createElement(
          'text',
          { className: classes.text, transform: 'scale(' + textScale + ')' },
          React.createElement('tspan', { x: '0', dy: '-0.5em' }, 'Unknown'),
          React.createElement('tspan', { x: '0', dy: '1em' }, 'State'),
        );
  };
  return React.createElement(
    'g',
    __assign(
      {
        ref: ref,
        className: onClick ? classes.marker : undefined,
        onClick: function (ev) {
          return onClick && onClick(ev, lift);
        },
      },
      otherProps,
    ),
    React.createElement(
      'g',
      { transform: !translate ? 'translate(' + -pos[0] + ' ' + -pos[1] + ')' : undefined },
      React.createElement(
        'g',
        { transform: 'translate(' + pos[0] + ' ' + pos[1] + ')' },
        React.createElement('rect', {
          className: classes.lift + ' ' + markerClass,
          width: width,
          height: depth,
          x: -width / 2,
          y: -depth / 2,
          rx: '0.1',
          ry: '0.1',
          transform: 'rotate(' + radiansToDegrees(fromRmfYaw(ref_yaw)) + ')',
        }),
        renderStatusText(),
      ),
      React.createElement(
        'g',
        null,
        doors.map(function (door, i) {
          return React.createElement(DoorMarker, {
            key: i,
            door: door,
            doorMode: doorMode,
            translate: true,
          });
        }),
      ),
    ),
  );
});
export default LiftMarker;
