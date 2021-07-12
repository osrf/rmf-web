import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DateAndTimePickers from '../date-time-picker';
export var DefaultDatesForm = function (props) {
  var search = props.search;
  var _a = React.useState(new Date()),
    fromLogDate = _a[0],
    setFromLogDate = _a[1];
  var _b = React.useState(new Date()),
    toLogDate = _b[0],
    setToLogDate = _b[1];
  var classes = useStyles();
  var searchQuery = function () {
    search && search({ toLogDate: toLogDate, fromLogDate: fromLogDate });
  };
  var handleFromLogDateChange = React.useCallback(function (date) {
    setFromLogDate(date);
  }, []);
  var handleToLogDateChange = React.useCallback(function (date) {
    setToLogDate(date);
  }, []);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: classes.searchForm },
      React.createElement(DateAndTimePickers, {
        name: 'fromLogDate',
        maxDate: new Date(),
        label: 'From',
        value: fromLogDate,
        onChange: handleFromLogDateChange,
      }),
      React.createElement(DateAndTimePickers, {
        name: 'toLogDate',
        maxDate: new Date(),
        label: 'To',
        value: toLogDate,
        onChange: handleToLogDateChange,
      }),
    ),
    React.createElement('br', null),
    React.createElement(
      Button,
      {
        color: 'primary',
        variant: 'contained',
        className: classes.searchButton,
        onClick: searchQuery,
      },
      'Retrieve Logs',
    ),
  );
};
var useStyles = makeStyles(function () {
  return {
    searchForm: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    searchButton: {
      width: '100%',
    },
  };
});
