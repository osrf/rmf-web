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
export var DeliveryRequestForm = React.forwardRef(function (props, ref) {
  var fleetNames = props.fleetNames,
    availableDispensers = props.availableDispensers,
    availablePlaces = props.availablePlaces,
    doDeliveryRequest = props.doDeliveryRequest;
  var classes = useFormStyles();
  var _a = React.useState(fleetNames.length >= 1 ? fleetNames[0] : ''),
    targetFleetName = _a[0],
    setTargetFleetName = _a[1];
  var _b = React.useState(targetFleetName ? availablePlaces(targetFleetName) : []),
    listOfPlaces = _b[0],
    setListOfPlaces = _b[1];
  // Places
  var _c = React.useState(!!listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[0] : ''),
    pickupPlaceName = _c[0],
    setPickupPlaceName = _c[1];
  var _d = React.useState(!!listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[1] : ''),
    dropOffPlaceName = _d[0],
    setDropOffPlaceName = _d[1];
  // Dispensers
  var _e = React.useState(''),
    pickupDispenser = _e[0],
    setPickupDispenser = _e[1];
  var _f = React.useState(''),
    dropOffDispenser = _f[0],
    setDropOffDispenser = _f[1];
  // Error states
  var _g = React.useState(''),
    targetFleetNameError = _g[0],
    setTargetFleetNameError = _g[1];
  var _h = React.useState(''),
    pickupPlaceNameError = _h[0],
    setPickupPlaceNameError = _h[1];
  var _j = React.useState(''),
    pickupDispenserError = _j[0],
    setPickupDispenserError = _j[1];
  var _k = React.useState(''),
    dropOffPlaceNameError = _k[0],
    setDropOffPlaceNameError = _k[1];
  var _l = React.useState(''),
    dropOffDispenserError = _l[0],
    setDropOffDispenserError = _l[1];
  var cleanUpForm = function () {
    setTargetFleetName(fleetNames.length >= 1 ? fleetNames[0] : '');
    setPickupPlaceName(listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[0] : '');
    setDropOffPlaceName(listOfPlaces && listOfPlaces.length >= 2 ? listOfPlaces[1] : '');
    setPickupDispenser('');
    setDropOffDispenser('');
    cleanUpError();
  };
  var cleanUpError = function () {
    setTargetFleetNameError('');
    setPickupPlaceNameError('');
    setDropOffPlaceNameError('');
    setPickupDispenserError('');
    setDropOffDispenserError('');
  };
  var handleSubmit = function (ev) {
    ev.preventDefault();
    if (isFormValid()) {
      doDeliveryRequest &&
        doDeliveryRequest(pickupPlaceName, pickupDispenser, dropOffPlaceName, dropOffDispenser);
      cleanUpForm();
    }
  };
  var dispensersFromPickUpPlace = React.useMemo(
    function () {
      var dispenser = pickupPlaceName ? availableDispensers(targetFleetName, pickupPlaceName) : [];
      return dispenser ? dispenser : [];
    },
    [pickupPlaceName, targetFleetName, availableDispensers],
  );
  var dispensersFromDropOffPlace = React.useMemo(
    function () {
      var dispenser = dropOffPlaceName
        ? availableDispensers(targetFleetName, dropOffPlaceName)
        : [];
      return dispenser ? dispenser : [];
    },
    [dropOffPlaceName, targetFleetName, availableDispensers],
  );
  React.useEffect(
    function () {
      setPickupDispenserError('');
      !!dispensersFromPickUpPlace &&
        dispensersFromPickUpPlace.length === 0 &&
        setPickupDispenserError('There is no dispensers on this place. Pick another place');
    },
    [dispensersFromPickUpPlace],
  );
  React.useEffect(
    function () {
      setDropOffDispenserError('');
      !!dispensersFromDropOffPlace &&
        dispensersFromDropOffPlace.length === 0 &&
        setDropOffDispenserError('There is no dispensers on this place. Pick another place');
    },
    [dispensersFromDropOffPlace],
  );
  var isFormValid = function () {
    var isValid = true;
    cleanUpError();
    if (targetFleetName === '') {
      setTargetFleetNameError('Fleet name cannot be empty');
      isValid = false;
    }
    if (pickupPlaceName === dropOffPlaceName) {
      setPickupPlaceNameError('Start Location cannot be equal to finish Location');
      setDropOffPlaceNameError('Start Location cannot be equal to finish Location');
      isValid = false;
    }
    if (pickupPlaceName === dropOffPlaceName) {
      setPickupDispenserError('Pickup dispenser cannot be equal to Drop off dispenser');
      setDropOffDispenserError('Drop off dispenser cannot be equal to Pickup dispenser');
      isValid = false;
    }
    var setEmpty = function (fieldSetter) {
      fieldSetter('Cannot be empty');
      isValid = false;
    };
    !pickupPlaceName && setEmpty(setPickupPlaceNameError);
    !dropOffPlaceName && setEmpty(setDropOffPlaceNameError);
    !pickupDispenser && setEmpty(setPickupDispenserError);
    !dropOffDispenser && setEmpty(setDropOffDispenserError);
    return isValid;
  };
  var handleTargetFleetNameChange = function (_, value) {
    var newFleetName = value || fleetNames[0];
    var newPlaces = availablePlaces(newFleetName);
    setPickupPlaceName(function (cur) {
      if (newPlaces.includes(cur)) {
        return cur;
      }
      return newPlaces.length >= 2 ? newPlaces[0] : '';
    });
    setPickupDispenser('');
    setDropOffPlaceName(function (cur) {
      if (newPlaces.includes(cur)) {
        return cur;
      }
      return newPlaces.length >= 2 ? newPlaces[1] : '';
    });
    setDropOffDispenser('');
    setListOfPlaces(availablePlaces(newFleetName));
    setTargetFleetName(newFleetName);
  };
  var handlePickupPlaceNameChange = function (_, value) {
    setPickupPlaceName(value || '');
    setPickupDispenser('');
  };
  var handleDropOoffPlaceNameChange = function (_, value) {
    setDropOffPlaceName(value || '');
    setDropOffDispenser('');
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
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return option;
        },
        onChange: handlePickupPlaceNameChange,
        options: listOfPlaces ? listOfPlaces : [],
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              error: !!pickupPlaceNameError,
              helperText: pickupPlaceNameError,
              label: 'Pick Start Location',
              placeholder: 'Pick Start Location',
              variant: 'outlined',
            }),
          );
        },
        value: pickupPlaceName ? pickupPlaceName : null,
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
          return setPickupDispenser(value || '');
        },
        options: dispensersFromPickUpPlace,
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              error: !!pickupDispenserError,
              helperText: pickupDispenserError,
              label: 'Pickup Dispenser',
              placeholder: 'Pickup Dispenser',
              variant: 'outlined',
            }),
          );
        },
        value: pickupDispenser ? pickupDispenser : null,
      }),
    ),
    React.createElement(
      'div',
      { className: classes.divForm },
      React.createElement(Autocomplete, {
        getOptionLabel: function (option) {
          return option;
        },
        onChange: handleDropOoffPlaceNameChange,
        options: listOfPlaces ? listOfPlaces : [],
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              error: !!dropOffPlaceNameError,
              helperText: dropOffPlaceNameError,
              label: 'Pick Drop Off Location',
              placeholder: 'Pick Drop Off Location',
              variant: 'outlined',
            }),
          );
        },
        value: dropOffPlaceName ? dropOffPlaceName : null,
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
          return setDropOffDispenser(value || '');
        },
        options: dispensersFromDropOffPlace,
        renderInput: function (params) {
          return React.createElement(
            TextField,
            __assign({}, params, {
              error: !!dropOffDispenserError,
              helperText: dropOffDispenserError,
              label: 'Pick Drop Off Dispenser',
              placeholder: 'Pick Drop Off Dispenser',
              variant: 'outlined',
            }),
          );
        },
        value: dropOffDispenser ? dropOffDispenser : null,
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
export default DeliveryRequestForm;
