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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
    return to;
  };
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { requestDoorModeToString, requestModeToString } from './lift-utils';
var useStyles = makeStyles(function (theme) {
  return {
    form: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '0.5rem',
    },
    divForm: {
      padding: '0.5rem',
      width: '100%',
    },
    error: {
      color: theme.palette.error.main,
    },
    input: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
    buttonContainer: {
      paddingTop: '0.5rem',
      width: '100%',
    },
  };
});
export var LiftRequestForm = function (props) {
  var lift = props.lift,
    availableRequestTypes = props.availableRequestTypes,
    availableDoorModes = props.availableDoorModes,
    onRequestSubmit = props.onRequestSubmit;
  var classes = useStyles();
  var _a = React.useState(availableDoorModes[0]),
    doorState = _a[0],
    setDoorState = _a[1];
  var _b = React.useState(availableRequestTypes[0]),
    requestType = _b[0],
    setRequestType = _b[1];
  var _c = React.useState(lift.levels[0]),
    destination = _c[0],
    setDestination = _c[1];
  // Error states
  var _d = React.useState(''),
    doorStateError = _d[0],
    setDoorStateError = _d[1];
  var _e = React.useState(''),
    requestTypeError = _e[0],
    setRequestTypeError = _e[1];
  var _f = React.useState(''),
    destinationError = _f[0],
    setDestinationError = _f[1];
  var cleanUpForm = function () {
    setDoorState(availableDoorModes[0]);
    setRequestType(availableRequestTypes[0]);
    setDestination(lift.levels[0]);
    cleanUpError();
  };
  var cleanUpError = function () {
    setDoorStateError('');
    setRequestTypeError('');
    setDestinationError('');
  };
  var isFormValid = function () {
    var isValid = true;
    cleanUpError();
    if (!destination) {
      setDestinationError('Destination cannot be empty');
      isValid = false;
    }
    return isValid;
  };
  var handleLiftRequest = function (event) {
    event.preventDefault();
    if (isFormValid()) {
      onRequestSubmit && onRequestSubmit(event, lift, doorState, requestType, destination);
      cleanUpForm();
    }
  };
  return React.createElement(
    'form',
    { className: classes.form, onSubmit: handleLiftRequest },
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return option;
        },
        onChange: function (_, value) {
          return setDestination(value || '');
        },
        options: __spreadArray([''], lift.levels),
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              label: 'Pick a Destination',
              placeholder: 'Pick a Destination',
              variant: 'outlined',
              error: !!destinationError,
              helperText: destinationError,
            }),
          );
        },
        value: destination,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return requestDoorModeToString(option);
        },
        onChange: function (_, value) {
          return setDoorState(value);
        },
        options: availableDoorModes,
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              label: 'Pick a Door State',
              placeholder: 'Pick a Door State',
              variant: 'outlined',
              error: !!doorStateError,
              helperText: doorStateError,
            }),
          );
        },
        value: doorState,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return requestModeToString(option);
        },
        onChange: function (_, value) {
          return setRequestType(value || availableRequestTypes[0]);
        },
        options: availableRequestTypes,
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              label: 'Pick Request Type',
              placeholder: 'Pick Request Type',
              variant: 'outlined',
              error: !!requestTypeError,
              helperText: requestTypeError,
            }),
          );
        },
        value: requestType,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.buttonContainer },
      React.createElement(
        Button,
        { variant: 'contained', color: 'primary', type: 'submit', className: classes.button },
        'Request',
      ),
    ),
  );
};
export default LiftRequestForm;
