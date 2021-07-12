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
import React from 'react';
import MaterialTable from 'material-table';
import { CustomLookupFilterParser, LogLevel } from '.';
import { makeStyles, Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { format } from 'date-fns';
var useStyles = makeStyles(function (theme) {
  return {
    error: {
      color: theme.palette.error.main,
    },
    debug: {
      color: theme.palette.secondary.dark,
    },
    warn: {
      color: theme.palette.warning.light,
    },
    info: {
      color: theme.palette.info.main,
    },
    cellContent: {
      display: 'block',
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
      marginInlineStart: '0px',
      marginInlineEnd: '0px',
    },
  };
});
export var LogTable = function (props) {
  var rows = props.rows,
    tableSize = props.tableSize,
    addMoreRows = props.addMoreRows;
  var classes = useStyles();
  var getLogLevelStyle = function (level) {
    level = level.toLowerCase();
    switch (level) {
      case LogLevel.Error:
        return classes.error;
      case LogLevel.Warn:
        return classes.warn;
      case LogLevel.Fatal:
        return classes.error;
      case LogLevel.Debug:
        return classes.debug;
      case LogLevel.Info:
        return classes.info;
      default:
        return undefined;
    }
  };
  // FIXME: we cannot copy the LogLevel Enum directly and remove the all attribute because it has a protected attribute.
  var logLevels = React.useMemo(function () {
    var logLevelCopy = {};
    Object.keys(LogLevel).forEach(function (element) {
      logLevelCopy[element] = LogLevel[element];
    });
    delete logLevelCopy['All'];
    return logLevelCopy;
  }, []);
  return React.createElement(MaterialTable, {
    title: 'Log Result',
    icons: materialTableIcons,
    columns: [
      {
        title: React.createElement(Typography, null, 'Level'),
        field: 'level',
        type: 'string',
        align: 'center',
        cellStyle: { padding: '0px', width: '2rem', maxWidth: '2rem' },
        headerStyle: {
          width: '2rem',
          maxWidth: '2rem',
        },
        filterCellStyle: {
          maxHeight: '2px',
        },
        lookup: logLevels,
        filterComponent: function (props) {
          return React.createElement(CustomLookupFilterParser, __assign({}, props));
        },
        render: function (rowData) {
          return React.createElement(
            Typography,
            { className: getLogLevelStyle(rowData.level) + ' ' + classes.cellContent },
            rowData.level,
          );
        },
      },
      {
        title: React.createElement(Typography, null, 'Container'),
        field: 'container',
        type: 'string',
        align: 'center',
        cellStyle: { padding: '0px', width: '2rem', maxWidth: '2rem' },
        headerStyle: {
          width: '2rem',
          maxWidth: '2rem',
        },
        filterCellStyle: {
          maxHeight: '2px',
        },
        render: function (rowData) {
          return React.createElement(
            Typography,
            { className: classes.cellContent },
            rowData.container_name ? rowData.container_name : 'Unknown',
          );
        },
      },
      {
        title: React.createElement(Typography, null, 'Message'),
        field: 'message',
        type: 'string',
        cellStyle: { padding: '0px', width: '75rem', minWidth: '75rem', whiteSpace: 'pre-wrap' },
        headerStyle: {
          width: '75rem',
          minWidth: '75rem',
        },
        render: function (rowData) {
          return React.createElement(
            Typography,
            { className: classes.cellContent },
            rowData.message,
          );
        },
      },
      {
        title: React.createElement(Typography, null, 'Timestamp'),
        field: 'created',
        type: 'datetime',
        filtering: false,
        align: 'center',
        cellStyle: { padding: '0px' },
        render: function (rowData) {
          return React.createElement(
            Typography,
            { className: classes.cellContent, 'data-testid': 'log-table-date' },
            format(new Date(rowData.created), 'MMM dd yyyy hh:mm aaa'),
          );
        },
      },
    ],
    data: rows,
    options: {
      filtering: true,
      search: false,
      pageSize: 100,
      pageSizeOptions: [50, 100, 200],
      maxBodyHeight: tableSize ? tableSize : '80vh',
    },
    onChangePage: function (page, pageSize) {
      if (addMoreRows) {
        rows.length / pageSize - 1 === page && addMoreRows();
      }
    },
  });
};
