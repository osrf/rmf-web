import React from 'react';
import { makeStyles, Typography, Button, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationsDialog } from '../index';
var useStyles = makeStyles(function (theme) {
  return {
    h2: {
      width: '100%',
      textAlign: 'center',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      lineHeight: '0.1em',
      margin: '10px 0 20px',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
    },
    span: {
      background: 'white',
      padding: '0 10px',
    },
    button: {
      width: '100%',
      margin: '0.5rem 0',
    },
    noNotification: {
      color: theme.palette.success.main,
    },
    hasNotification: {
      color: theme.palette.warning.main,
    },
  };
});
export var SystemSummaryAlert = function (props) {
  var classes = useStyles();
  var notifications = props.notifications,
    onNotificationsDismiss = props.onNotificationsDismiss;
  var _a = React.useState(false),
    showNotifications = _a[0],
    setShowNotifications = _a[1];
  var getLabel =
    notifications.length > 0
      ? classes.h2 + ' ' + classes.hasNotification
      : classes.h2 + ' ' + classes.noNotification;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Typography, { variant: 'h6' }, 'Notifications'),
    React.createElement(
      'h2',
      { className: getLabel },
      React.createElement(
        'span',
        { className: classes.span },
        notifications.length > 0 ? notifications.length + ' Alerts' : 'No Alerts',
      ),
    ),
    React.createElement(
      Button,
      {
        disabled: notifications.length === 0,
        variant: 'contained',
        color: 'primary',
        className: classes.button,
        onClick: function () {
          return setShowNotifications(true);
        },
      },
      'Notifications',
      React.createElement(
        Badge,
        { badgeContent: notifications.length, color: 'error' },
        React.createElement(NotificationsIcon, null),
      ),
    ),
    React.createElement(NotificationsDialog, {
      notifications: notifications,
      showNotificationsDialog: showNotifications,
      onNotificationsDismiss: onNotificationsDismiss,
      onClose: function () {
        return setShowNotifications(false);
      },
    }),
  );
};
