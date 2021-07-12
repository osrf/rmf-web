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
import { Button, Dialog, DialogContentText, Slide } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    icon: {
      height: '8rem',
      alignSelf: 'center',
    },
    title: {
      alignSelf: 'center',
    },
  };
});
var DialogTitle = function (props) {
  var onCloseClick = props.onCloseClick,
    children = props.children,
    otherProps = __rest(props, ['onCloseClick', 'children']);
  var classes = useStyles();
  return React.createElement(
    MuiDialogTitle,
    __assign({ disableTypography: true, className: classes.root }, otherProps),
    React.createElement(Typography, { variant: 'h6' }, children),
    onCloseClick
      ? React.createElement(
          IconButton,
          { 'aria-label': 'close', className: classes.closeButton, onClick: onCloseClick },
          React.createElement(CloseIcon, null),
        )
      : null,
  );
};
var DialogContent = withStyles(function (theme) {
  return {
    root: {
      padding: theme.spacing(2),
    },
  };
})(MuiDialogContent);
var DialogActions = withStyles(function (theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  };
})(MuiDialogActions);
var Transition = React.forwardRef(function Transition(props, ref) {
  return React.createElement(Slide, __assign({ direction: 'up', ref: ref }, props));
});
/**
 * Modal to warn a user about something related to an action.
 */
export var AlertDialog = React.forwardRef(function (props, ref) {
  var title = props.title,
    variant = props.variant,
    message = props.message,
    positiveText = props.positiveText,
    negativeText = props.negativeText,
    onPositiveClick = props.onPositiveClick,
    onNegativeClick = props.onNegativeClick,
    onCloseClick = props.onCloseClick,
    otherProps = __rest(props, [
      'title',
      'variant',
      'message',
      'positiveText',
      'negativeText',
      'onPositiveClick',
      'onNegativeClick',
      'onCloseClick',
    ]);
  var classes = useStyles();
  return React.createElement(
    'div',
    null,
    React.createElement(
      Dialog,
      __assign(
        {
          ref: ref,
          TransitionComponent: Transition,
          'aria-labelledby': 'alert-dialog-slide-title',
          'aria-describedby': 'alert-dialog-slide-description',
        },
        otherProps,
      ),
      variant !== 'noIcon' &&
        React.createElement(
          'div',
          { className: classes.icon },
          variant === 'warn' &&
            React.createElement(WarningIcon, {
              color: 'secondary',
              style: {
                fontSize: '8rem',
              },
            }),
        ),
      React.createElement(
        DialogTitle,
        { id: 'alert-dialog-slide-title', onCloseClick: onCloseClick, className: classes.title },
        title,
      ),
      React.createElement(
        DialogContent,
        { id: 'alert-dialog-slide-description' },
        message && React.createElement(DialogContentText, null, message),
      ),
      React.createElement(
        DialogActions,
        null,
        negativeText &&
          React.createElement(
            Button,
            { onClick: onNegativeClick, color: 'primary', id: 'alert-dialog-cancel-button' },
            negativeText,
          ),
        React.createElement(
          Button,
          { onClick: onPositiveClick, color: 'secondary', id: 'alert-dialog-confirm-button' },
          positiveText || 'OK',
        ),
      ),
    ),
  );
});
export default AlertDialog;
