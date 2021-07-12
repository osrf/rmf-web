import React from 'react';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { format } from 'date-fns';
export var LiftStateReportTable = function (props) {
  var rows = props.rows,
    tableSize = props.tableSize,
    addMoreRows = props.addMoreRows;
  return React.createElement(MaterialTable, {
    title: 'Lift State',
    icons: materialTableIcons,
    columns: [
      {
        title: React.createElement(Typography, null, 'Session ID'),
        field: 'level',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.session_id);
        },
      },
      {
        title: React.createElement(Typography, null, 'State'),
        field: 'message',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.state);
        },
      },
      {
        title: React.createElement(Typography, null, 'Door State'),
        field: 'message',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.door_state);
        },
      },
      {
        title: React.createElement(Typography, null, 'Destination Floor'),
        field: 'message',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.destination_floor);
        },
      },
      {
        title: React.createElement(Typography, null, 'Motion State'),
        field: 'message',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.motion_state);
        },
      },
      {
        title: React.createElement(Typography, null, 'Current Floor'),
        field: 'message',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.current_floor);
        },
      },
      {
        title: React.createElement(Typography, null, 'Timestamp'),
        field: 'timestamp',
        type: 'datetime',
        filtering: false,
        align: 'center',
        render: function (rowData) {
          return React.createElement(
            Typography,
            { 'data-testid': 'lift-table-date' },
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
