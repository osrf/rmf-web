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
import { fromRmfCoords } from '../geometry-utils';
var debug = Debug('Waypoints:WaypointMarker');
var useStyles = makeStyles(function () {
  return {
    marker: {
      pointerEvents: 'none',
    },
    text: {
      dominantBaseline: 'central',
      textAnchor: 'middle',
      fontSize: '0.25px',
      fontWeight: 'bold',
      fill: 'white',
      /* 1 pixel black shadow to left, top, right and bottom */
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      userSelect: 'none',
    },
  };
});
export var WaypointMarker = React.forwardRef(function (props, ref) {
  var waypoint = props.waypoint,
    _a = props.size,
    size = _a === void 0 ? 0.1 : _a,
    _b = props.translate,
    translate = _b === void 0 ? true : _b,
    otherProps = __rest(props, ['waypoint', 'size', 'translate']);
  debug('render ' + waypoint.name);
  var pos = fromRmfCoords([waypoint.x, waypoint.y]);
  var classes = useStyles();
  return React.createElement(
    'g',
    __assign({ ref: ref }, otherProps),
    React.createElement(
      'g',
      { transform: translate ? 'translate(' + pos[0] + ' ' + pos[1] + ')' : undefined },
      React.createElement(
        'filter',
        {
          id: 'waypoint-' + waypoint.name + '-shadow',
          x: '-20%',
          y: '-20%',
          width: '140%',
          height: '140%',
        },
        React.createElement('feDropShadow', {
          dx: -size * 0.1,
          dy: -size * 0.1,
          stdDeviation: size * 0.15,
          floodColor: 'black',
        }),
      ),
      React.createElement('rect', {
        className: classes.marker,
        x: -size,
        y: -size,
        width: size * 2,
        height: size * 2,
        fill: '#FFBF00',
        filter: 'url(#waypoint-' + waypoint.name + '-shadow)',
      }),
      React.createElement('text', { y: size * 2.5, className: classes.text }, waypoint.name),
    ),
  );
});
