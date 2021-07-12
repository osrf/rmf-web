import React from 'react';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { format } from 'date-fns';
export var FleetStateReportTable = function (props) {
  var rows = props.rows,
    tableSize = props.tableSize,
    addMoreRows = props.addMoreRows;
  return React.createElement(MaterialTable, {
    title: 'Fleet State',
    icons: materialTableIcons,
    columns: [
      {
        title: React.createElement(Typography, null, 'Fleet'),
        field: 'fleet_name',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.fleet_name);
        },
      },
      {
        title: React.createElement(Typography, null, 'Robot'),
        field: 'robot_name',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.robot_name);
        },
      },
      {
        title: React.createElement(Typography, null, 'Battery'),
        field: 'robot_battery_percent',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.robot_battery_percent);
        },
      },
      {
        title: React.createElement(Typography, null, 'Mode'),
        field: 'robot_mode',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.robot_mode);
        },
      },
      {
        title: React.createElement(Typography, null, 'Model'),
        field: 'robot_model',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.robot_model);
        },
      },
      {
        title: React.createElement(Typography, null, 'TaskID'),
        field: 'robot_task_id',
        type: 'string',
        render: function (rowData) {
          return React.createElement(Typography, null, rowData.robot_task_id);
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
            { 'data-testid': 'fleet-table-date' },
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
