import React from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
export var SearchFilter = function (props) {
  var handleOnChange = props.handleOnChange,
    options = props.options,
    name = props.name,
    label = props.label,
    currentValue = props.currentValue;
  var classes = useStyles();
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      null,
      React.createElement(
        FormControl,
        { variant: 'outlined', className: classes.formControl },
        React.createElement(InputLabel, { id: name + '-select-outlined-label' }, label),
        React.createElement(
          Select,
          {
            labelId: name + '-select-outlined-label',
            id: name + '-select-outlined',
            type: 'string',
            value: currentValue,
            onChange: handleOnChange,
            label: label,
          },
          options.map(function (option) {
            return React.createElement(
              MenuItem,
              { key: option.label, value: option.value },
              option.label,
            );
          }),
        ),
      ),
    ),
  );
};
var useStyles = makeStyles(function (theme) {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: '230px',
    },
  };
});
