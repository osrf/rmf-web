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
import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { joinClasses } from './css-utils';
var useStyles = makeStyles(function (theme) {
  return {
    status: {
      borderColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      borderStyle: 'solid',
      border: 2,
      padding: 5,
      width: '4rem',
      textAlign: 'center',
      flexShrink: 0,
    },
    unknown: {
      borderColor: theme.palette.grey[500],
    },
  };
});
export var StatusLabel = function (props) {
  var _a = props.text,
    text = _a === void 0 ? '' : _a,
    className = props.className,
    _b = props.variant,
    variant = _b === void 0 ? 'normal' : _b,
    otherProps = __rest(props, ['text', 'className', 'variant']);
  var classes = useStyles();
  return React.createElement(
    'div',
    __assign(
      {
        className: joinClasses(
          classes.status,
          className,
          variant === 'unknown' ? classes.unknown : undefined,
        ),
      },
      otherProps,
    ),
    React.createElement(
      Typography,
      { variant: 'button', role: 'status' },
      variant === 'unknown' ? 'N/A' : text,
    ),
  );
};
