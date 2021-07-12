import React from 'react';
import { TextField, makeStyles, Divider } from '@material-ui/core';
var useStyles = makeStyles(function () {
  return {
    simpleFilter: {
      margin: '1rem',
    },
    filterBar: {
      width: '100%',
    },
    divider: {
      margin: '1.5rem 0',
    },
  };
});
export var SimpleFilter = function (props) {
  var classes = useStyles();
  var onChange = props.onChange,
    value = props.value;
  return React.createElement(
    'div',
    { className: classes.simpleFilter },
    React.createElement(TextField, {
      label: 'Filter',
      value: value,
      variant: 'outlined',
      onChange: onChange,
      className: classes.filterBar,
      'aria-label': 'text-input',
      'data-component': 'simple-filter',
    }),
    React.createElement(Divider, { className: classes.divider }),
  );
};
