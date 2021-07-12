import React from 'react';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { DefaultLogTableProps } from '../default-report-interface';
import { format } from 'date-fns';

export type UserLoginRowsType = {
  client_id: string;
  created: string; //date
  ip_address: string;
  user_id: string;
  username: string;
}[];

export interface UserLoginReportTable extends DefaultLogTableProps {
  rows: UserLoginRowsType;
}

export const UserLoginReportTable = (props: UserLoginReportTable): React.ReactElement => {
  const { rows, tableSize, addMoreRows } = props;

  return (
    <MaterialTable
      title="Login Report"
      icons={materialTableIcons}
      columns={[
        {
          title: <Typography>Username</Typography>,
          field: 'username',
          type: 'string',
          render: (rowData) => {
            return <Typography>{rowData.username}</Typography>;
          },
        },
        {
          title: <Typography>Timestamp</Typography>,
          field: 'timestamp',
          type: 'datetime',
          filtering: false,
          align: 'center',
          render: (rowData) => {
            return (
              <Typography data-testid={'user-logn-table-date'}>
                {format(new Date(rowData.created), 'MMM dd yyyy hh:mm aaa')}
              </Typography>
            );
          },
        },
        {
          title: <Typography>Client ID</Typography>,
          field: 'message',
          type: 'string',
          render: (rowData) => {
            return <Typography>{rowData.client_id}</Typography>;
          },
        },
        {
          title: <Typography>User ID</Typography>,
          field: 'message',
          type: 'string',
          render: (rowData) => {
            return <Typography>{rowData.user_id}</Typography>;
          },
        },
        {
          title: <Typography>IP Addr.</Typography>,
          field: 'message',
          type: 'string',
          render: (rowData) => {
            return <Typography>{rowData.ip_address}</Typography>;
          },
        },
      ]}
      data={rows}
      options={{
        filtering: true,
        search: false,
        pageSize: 100,
        pageSizeOptions: [50, 100, 200],
        maxBodyHeight: tableSize ? tableSize : '80vh',
      }}
      onChangePage={(page, pageSize) => {
        if (addMoreRows) {
          rows.length / pageSize - 1 === page && addMoreRows();
        }
      }}
    />
  );
};
