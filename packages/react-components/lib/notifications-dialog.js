import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  makeStyles,
  Typography,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Select,
  MenuItem,
  Input,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { formatDistance } from 'date-fns';
export var Severity;
(function (Severity) {
  Severity['Low'] = 'Low';
  Severity['Medium'] = 'Medium';
  Severity['High'] = 'High';
})(Severity || (Severity = {}));
var useStyles = makeStyles(function (theme) {
  return {
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogActions: {
      margin: '0',
      padding: theme.spacing(1),
    },
    dialogContent: {
      padding: theme.spacing(5),
    },
    paper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr) 4fr 1fr',
      textAlign: 'center',
      padding: theme.spacing(1),
      width: '100%',
      margin: '0.5rem 0',
    },
    filter: {
      display: 'flex',
      float: 'right',
      marginBottom: theme.spacing(1),
    },
    select: {
      width: '150px',
      padding: '0 0.5rem',
    },
    removeNotificationIcon: {
      color: theme.palette.error.main,
      padding: '0',
    },
    legend: {
      display: 'flex',
    },
    indicator: {
      padding: '0',
      fontWeight: 600,
    },
    placeholder: {
      color: theme.palette.success.main,
    },
  };
});
var severityStyles = makeStyles(function (theme) {
  return {
    high: {
      color: theme.palette.secondary.dark,
    },
    medium: {
      color: theme.palette.error.main,
    },
    low: {
      color: theme.palette.warning.light,
    },
  };
});
var SeverityIndicator = function (props) {
  var severity = props.severity,
    className = props.className;
  var classes = severityStyles();
  var getStatusLabelClass = function (severity) {
    switch (severity) {
      case Severity.High:
        return classes.high;
      case Severity.Medium:
        return classes.medium;
      case Severity.Low:
        return classes.low;
      default:
        return '';
    }
  };
  var styles = getStatusLabelClass(severity) + ' ' + className;
  return React.createElement(
    Typography,
    { variant: 'body1', className: styles, align: 'left' },
    severity,
  );
};
export var NotificationsDialog = function (props) {
  var classes = useStyles();
  var showNotificationsDialog = props.showNotificationsDialog,
    onClose = props.onClose,
    notifications = props.notifications,
    onNotificationsDismiss = props.onNotificationsDismiss;
  var _a = React.useState(''),
    level = _a[0],
    setLevel = _a[1];
  var _b = React.useState(notifications),
    rmfNotifications = _b[0],
    setRmfNotifications = _b[1];
  // list of alert level for filtering
  // TODO - Check and change alert level once backend is up and confirm
  var alertLevel = ['Low', 'Medium', 'High', 'All'];
  React.useEffect(
    function () {
      setRmfNotifications(notifications);
    },
    [notifications],
  );
  // handle filter change
  var handleChange = function (e) {
    var val = e.target.value;
    setLevel(val);
    var filterNotifications = [];
    if (val === 'All') {
      setRmfNotifications(notifications);
    } else {
      notifications.forEach(function (notification) {
        if (notification.severity === val) {
          filterNotifications.push(notification);
        }
      });
      setRmfNotifications(filterNotifications);
    }
  };
  var timeDistance = function (time) {
    return formatDistance(new Date(), new Date(time));
  };
  return React.createElement(
    Dialog,
    {
      open: showNotificationsDialog,
      onClose: function () {
        return onClose();
      },
      fullWidth: true,
      maxWidth: 'md',
    },
    React.createElement(
      DialogTitle,
      null,
      'Notifications',
      React.createElement(
        IconButton,
        {
          'aria-label': 'close',
          className: classes.closeButton,
          onClick: function () {
            return onClose();
          },
        },
        React.createElement(CloseIcon, null),
      ),
    ),
    React.createElement(
      DialogContent,
      { className: classes.dialogContent, dividers: true },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          { className: classes.filter },
          React.createElement(
            Select,
            {
              className: classes.select,
              displayEmpty: true,
              value: level,
              onChange: function (e) {
                return handleChange(e);
              },
              input: React.createElement(Input, { 'aria-label': 'filter-input' }),
              renderValue: function () {
                return level === '' ? React.createElement('em', null, 'Filter by severity') : level;
              },
            },
            alertLevel.map(function (level) {
              return React.createElement(MenuItem, { key: level, value: level }, level);
            }),
          ),
        ),
        rmfNotifications.map(function (notification, i) {
          return React.createElement(
            React.Fragment,
            { key: notification.time + '_' + i },
            React.createElement(
              Paper,
              { elevation: 3, className: classes.paper },
              React.createElement(SeverityIndicator, {
                className: classes.indicator,
                severity: notification.severity,
              }),
              React.createElement(
                Typography,
                { variant: 'body1', align: 'left' },
                timeDistance(notification.time),
              ),
              React.createElement(
                Typography,
                { variant: 'body1', align: 'left' },
                notification.error,
              ),
              React.createElement(
                Typography,
                { align: 'right' },
                React.createElement(
                  IconButton,
                  {
                    'aria-label': 'dismiss-button',
                    className: classes.removeNotificationIcon,
                    onClick: function () {
                      return onNotificationsDismiss && onNotificationsDismiss(notification.id);
                    },
                  },
                  React.createElement(CloseIcon, null),
                ),
              ),
            ),
          );
        }),
      ),
    ),
    React.createElement(
      DialogActions,
      { className: classes.dialogActions },
      React.createElement(
        Button,
        {
          autoFocus: true,
          onClick: function () {
            return onClose();
          },
          color: 'primary',
        },
        'CLOSE',
      ),
    ),
  );
};
