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
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useFormStyles } from './form-styles';
export var LoopRequestForm = React.forwardRef(function (props, ref) {
  var fleetNames = props.fleetNames,
    availablePlaces = props.availablePlaces,
    doLoopRequest = props.doLoopRequest;
  var classes = useFormStyles();
  var _a = React.useState(fleetNames.length >= 1 ? fleetNames[0] : ''),
    targetFleetName = _a[0],
    setTargetFleetName = _a[1];
  var _b = React.useState(0),
    numLoops = _b[0],
    setNumLoops = _b[1];
  var _c = React.useState(targetFleetName ? availablePlaces(targetFleetName) : []),
    listOfPlaces = _c[0],
    setListOfPlaces = _c[1];
  var _d = React.useState(listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[0] : ''),
    startLocation = _d[0],
    setStartLocation = _d[1];
  var _e = React.useState(listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[1] : ''),
    finishLocation = _e[0],
    setFinishLocation = _e[1];
  React.useLayoutEffect(
    function () {
      if (listOfPlaces) {
        setStartLocation(listOfPlaces.length >= 2 ? listOfPlaces[0] : '');
        setFinishLocation(listOfPlaces.length >= 2 ? listOfPlaces[1] : '');
      }
    },
    [listOfPlaces],
  );
  // Error states
  var _f = React.useState(''),
    targetFleetNameError = _f[0],
    setTargetFleetNameError = _f[1];
  var _g = React.useState(''),
    numLoopsError = _g[0],
    setNumLoopsError = _g[1];
  var _h = React.useState(''),
    startLocationError = _h[0],
    setStartLocationError = _h[1];
  var _j = React.useState(''),
    finishLocationError = _j[0],
    setFinishLocationError = _j[1];
  var cleanUpForm = function () {
    setTargetFleetName(targetFleetName);
    setNumLoops(0);
    setListOfPlaces(targetFleetName ? availablePlaces(targetFleetName) : []);
    setStartLocation(listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[0] : '');
    setFinishLocation(listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[1] : '');
    cleanUpError();
  };
  var cleanUpError = function () {
    setTargetFleetNameError('');
    setNumLoopsError('');
    setStartLocationError('');
    setFinishLocationError('');
  };
  var isFormValid = function () {
    var isValid = true;
    cleanUpError();
    if (targetFleetName === '') {
      setTargetFleetNameError('Fleet name cannot be empty');
      isValid = false;
    }
    if (numLoops === 0 || numLoops < 0) {
      setNumLoopsError('Loops can only be > 0');
      isValid = false;
    }
    if (startLocation === finishLocation) {
      setStartLocationError('Start Location cannot be equal to Finish Location');
      setFinishLocationError('Start Location cannot be equal to Finish Location');
      isValid = false;
    }
    if (!startLocation) {
      setStartLocationError('Location cannot be empty');
      isValid = false;
    }
    if (!finishLocation) {
      setFinishLocationError('Location cannot be empty');
      isValid = false;
    }
    return isValid;
  };
  var handleTargetFleetNameChange = function (_, value) {
    var newFleetName = value || fleetNames[0];
    var newPlaces = availablePlaces(newFleetName) || [];
    setListOfPlaces(newPlaces);
    setStartLocation(function (cur) {
      if (newPlaces.includes(cur)) {
        return cur;
      }
      return newPlaces.length >= 2 ? newPlaces[0] : '';
    });
    setFinishLocation(function (cur) {
      if (newPlaces.includes(cur)) {
        return cur;
      }
      return newPlaces.length >= 2 ? newPlaces[1] : '';
    });
    setTargetFleetName(newFleetName);
  };
  var handleSubmit = function (ev) {
    ev.preventDefault();
    if (isFormValid()) {
      doLoopRequest && doLoopRequest(targetFleetName, numLoops, startLocation, finishLocation);
      cleanUpForm();
    }
  };
  return React.createElement(
    'form',
    { ref: ref, className: classes.form, onSubmit: handleSubmit },
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return option;
        },
        onChange: handleTargetFleetNameChange,
        options: fleetNames,
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              label: 'Choose Target Fleet',
              placeholder: 'Choose Target Fleet',
              variant: 'outlined',
              error: !!targetFleetNameError,
              helperText: targetFleetNameError,
            }),
          );
        },
        value: targetFleetName ? targetFleetName : null,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(TextField, {
        onChange: function (e) {
          setNumLoops(e.target.value ? parseInt(e.target.value) : 0);
        },
        placeholder: 'Number of loops',
        type: 'number',
        value: numLoops || '',
        className: classes.input,
        label: 'Number of loops',
        variant: 'outlined',
        error: !!numLoopsError,
        helperText: numLoopsError,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return option;
        },
        onChange: function (_, value) {
          return setStartLocation(value || '');
        },
        options: listOfPlaces ? listOfPlaces : [],
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              label: 'Pick Start Location',
              placeholder: 'Pick Start Location',
              variant: 'outlined',
              error: !!startLocationError,
              helperText: startLocationError,
            }),
          );
        },
        value: startLocation ? startLocation : null,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return option;
        },
        onChange: function (_, value) {
          return setFinishLocation(value || '');
        },
        options: listOfPlaces ? listOfPlaces : [],
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              label: 'Pick Finish Location',
              placeholder: 'Pick Finish Location',
              variant: 'outlined',
              error: !!finishLocationError,
              helperText: finishLocationError,
            }),
          );
        },
        value: finishLocation ? finishLocation : null,
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
});
export default LoopRequestForm;
