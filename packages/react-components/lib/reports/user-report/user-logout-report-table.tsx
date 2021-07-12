import React from 'react';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { DefaultLogTableProps } from '../default-report-interface';
import { format } from 'date-fns';

export type UserLogoutRowsType = {
  created: string; //date
  ip_address: string;
  user_id: string;
  username: string;
}[];

export interface UserLogoutReportTable extends DefaultLogTableProps {
  rows: UserLogoutRowsType;
}

export const UserLogoutReportTable = (props: UserLogoutReportTable): React.ReactElement => {
  const { rows, tableSize, addMoreRows } = props;

  return (
    <MaterialTable
      title="Logout Report"
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
              <Typography data-testid={'user-logout-table-date'}>
                {format(new Date(rowData.created), 'MMM dd yyyy hh:mm aaa')}
              </Typography>
            );
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
