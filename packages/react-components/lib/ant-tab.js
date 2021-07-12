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
import { Box, createStyles, Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
export var AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);
export var AntTab = withStyles(function (theme) {
  return createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  });
})(function (props) {
  return React.createElement(Tab, __assign({ disableRipple: true }, props));
});
export function TabPanel(props) {
  var children = props.children,
    value = props.value,
    index = props.index,
    _a = props.fullWidth,
    fullWidth = _a === void 0 ? false : _a,
    other = __rest(props, ['children', 'value', 'index', 'fullWidth']);
  return React.createElement(
    'div',
    __assign(
      {
        role: 'tabpanel',
        hidden: value !== index,
        id: 'scrollable-prevent-tabpanel-' + index,
        'aria-labelledby': 'scrollable-prevent-tab-' + index,
      },
      other,
    ),
    value === index && fullWidth ? children : React.createElement(Box, { p: 1 }, children),
  );
}
