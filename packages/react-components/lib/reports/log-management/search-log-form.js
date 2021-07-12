import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { SearchFilter } from './search-filter';
import DateAndTimePickers from '../../date-time-picker';
import { LogLevel } from './log-level';
var logLevelValues = [
  { label: 'ALL', value: LogLevel.All },
  { label: 'FATAL', value: LogLevel.Fatal },
  { label: 'ERROR', value: LogLevel.Error },
  { label: 'WARN', value: LogLevel.Warn },
  { label: 'INFO', value: LogLevel.Info },
  { label: 'DEBUG', value: LogLevel.Debug },
];
export var SearchLogForm = function (props) {
  var search = props.search,
    logLabelValues = props.logLabelValues;
  // The log contains information from different services, the label help us differentiate the service
  var _a = React.useState(''),
    logLabel = _a[0],
    setLogLabel = _a[1];
  var _b = React.useState(LogLevel.All),
    logLevel = _b[0],
    setLogLevel = _b[1];
  var _c = React.useState(new Date()),
    fromLogDate = _c[0],
    setFromLogDate = _c[1];
  var _d = React.useState(new Date()),
    toLogDate = _d[0],
    setToLogDate = _d[1];
  var classes = useStyles();
  var searchQuery = function () {
    search &&
      search({
        toLogDate: toLogDate,
        fromLogDate: fromLogDate,
        logLabel: logLabel,
        logLevel: logLevel,
      });
  };
  var handleLogLabelChange = React.useCallback(function (event) {
    setLogLabel(event.target.value);
  }, []);
  var handleLogLevelChange = React.useCallback(function (event) {
    setLogLevel(event.target.value);
  }, []);
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
      React.createElement(SearchFilter, {
        options: logLabelValues,
        name: 'log-picker',
        label: 'Pick Log Label',
        'aria-label': 'log-label-picker',
        handleOnChange: handleLogLabelChange,
        currentValue: logLabel,
      }),
      React.createElement(SearchFilter, {
        options: logLevelValues,
        name: 'log-level',
        label: 'Pick Log Level',
        handleOnChange: handleLogLevelChange,
        currentValue: logLevel,
      }),
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
var useStyles = makeStyles(function (theme) {
  return {
    searchForm: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      alignItems: 'center',
      justifyItems: 'center',
    },
    searchButton: {
      width: '100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  };
});
