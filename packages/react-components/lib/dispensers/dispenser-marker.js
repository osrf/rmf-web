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
import SvgText from '../svg-text';
import DefaultMarkerIcon from './default-marker-icon';
var debug = Debug('Dispensers:DispenserMarker');
var useStyles = makeStyles(function () {
  return {
    text: {
      dominantBaseline: 'central',
      textAnchor: 'middle',
      fontSize: '0.18px',
      fontWeight: 'bold',
      fill: 'white',
      /* 1 pixel black shadow to left, top, right and bottom */
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      pointerEvents: 'none',
      userSelect: 'none',
    },
    clickable: {
      pointerEvents: 'auto',
      cursor: 'pointer',
    },
  };
});
export var DispenserMarker = React.forwardRef(function (props, ref) {
  var guid = props.guid,
    location_ = props.location,
    _a = props.footprint,
    footprint = _a === void 0 ? 0.4 : _a,
    iconPath = props.iconPath,
    onClick = props.onClick,
    otherProps = __rest(props, ['guid', 'location', 'footprint', 'iconPath', 'onClick']);
  debug('render ' + guid);
  var classes = useStyles();
  var _b = React.useState(!!iconPath),
    useImageIcon = _b[0],
    setUseImageIcon = _b[1];
  var location = fromRmfCoords(location_);
  return React.createElement(
    'g',
    __assign(
      {
        ref: ref,
        onClick: function (e) {
          return onClick && onClick(e, guid);
        },
      },
      otherProps,
    ),
    React.createElement(
      'g',
      {
        className: onClick ? classes.clickable : undefined,
        transform: 'translate(' + location[0] + ' ' + location[1] + ')',
      },
      useImageIcon
        ? React.createElement('image', {
            href: iconPath,
            x: -footprint,
            y: -footprint,
            width: footprint * 2,
            height: footprint * 2,
            onError: function () {
              return setUseImageIcon(false);
            },
          })
        : // the default marker's size is slightly smaller than the footprint
          React.createElement(DefaultMarkerIcon, { footprint: footprint * 1.4 }),
      React.createElement('rect', {
        x: -footprint,
        y: -footprint,
        width: footprint * 2,
        height: footprint * 2,
        fill: 'transparent',
      }),
      React.createElement(SvgText, {
        className: classes.text,
        text: guid,
        targetWidth: footprint * 2.2,
      }),
    ),
  );
});
export default DispenserMarker;
