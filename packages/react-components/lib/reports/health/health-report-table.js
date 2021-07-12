import React from 'react';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { format } from 'date-fns';
export var HealthReportTable = function (props) {
  var rows = props.rows,
    tableSize = props.tableSize,
    addMoreRows = props.addMoreRows;
  return React.createElement(MaterialTable, {
    title: 'Health',
    icons: materialTableIcons,
    columns: [
      {
        title: React.createElement(Typography, null, 'Device'),
        field: 'device',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.device);
        },
      },
      {
        title: React.createElement(Typography, null, 'Actor'),
        field: 'actor_id',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.actor_id);
        },
      },
      {
        title: React.createElement(Typography, null, 'Health Status'),
        field: 'health_status',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.health_status);
        },
      },
      {
        title: React.createElement(Typography, null, 'Health Message'),
        field: 'health_message',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.health_message);
        },
      },
      {
        title: React.createElement(Typography, null, 'Timestamp'),
        field: 'created',
        type: 'datetime',
        filtering: false,
        align: 'center',
        render: function (rowData) {
          return React.createElement(
            Typography,
            { 'data-testid': 'health-table-date' },
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
