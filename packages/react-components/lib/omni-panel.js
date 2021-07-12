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
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import React from 'react';
import { joinClasses } from './css-utils';
var useStyles = makeStyles(function (theme) {
  return {
    mainContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
      borderRadius: '16px 16px 0px 0px',
    },
    viewContainer: {
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      border: '1px ' + theme.palette.divider + ' solid',
      borderTop: 0,
    },
    navigationButton: {
      borderRadius: 'inherit',
      borderColor: theme.palette.divider,
    },
    navigationButtonGroup: {
      borderRadius: 'inherit',
    },
    slideIn: {
      position: 'relative',
      height: '100%',
      overflow: 'auto',
    },
    slideOut: {
      position: 'absolute',
    },
  };
});
export var OmniPanel = function (props) {
  var stack = props.stack,
    children = props.children,
    variant = props.variant,
    timeout = props.timeout,
    mountOnEnter = props.mountOnEnter,
    _a = props.unmountOnExit,
    unmountOnExit = _a === void 0 ? true : _a,
    onBack = props.onBack,
    onHome = props.onHome,
    onClose = props.onClose,
    otherProps = __rest(props, [
      'stack',
      'children',
      'variant',
      'timeout',
      'mountOnEnter',
      'unmountOnExit',
      'onBack',
      'onHome',
      'onClose',
    ]);
  var classes_ = useStyles();
  var renderView = function (child) {
    var slideIn = stack[stack.length - 1] === child.props.viewId;
    return React.createElement(
      Slide,
      {
        key: child.props.viewId,
        direction: 'left',
        in: slideIn,
        appear: false,
        timeout: timeout,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
      },
      React.createElement(
        'div',
        { className: joinClasses(slideIn ? classes_.slideIn : classes_.slideOut) },
        child,
      ),
    );
  };
  return React.createElement(
    'div',
    __assign({}, otherProps),
    React.createElement(
      'div',
      { className: classes_.mainContainer },
      React.createElement(
        ButtonGroup,
        { fullWidth: true, className: classes_.navigationButtonGroup },
        React.createElement(Button, {
          className: classes_.navigationButton,
          onClick: onBack,
          'aria-label': 'Back',
          startIcon: React.createElement(BackIcon, null),
          size: 'large',
        }),
        React.createElement(Button, {
          className: classes_.navigationButton,
          onClick: onHome,
          'aria-label': 'Home',
          startIcon: React.createElement(HomeIcon, null),
          size: 'large',
        }),
        variant === 'backHomeClose' &&
          React.createElement(Button, {
            className: classes_.navigationButton,
            onClick: onClose,
            'aria-label': 'Close',
            startIcon: React.createElement(CloseIcon, null),
            size: 'large',
          }),
      ),
      React.createElement(
        'div',
        { className: classes_.viewContainer },
        Array.isArray(children) ? children.map(renderView) : renderView(children),
      ),
    ),
  );
};
export default OmniPanel;
