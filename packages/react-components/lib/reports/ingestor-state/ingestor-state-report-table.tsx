import React from 'react';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import { materialTableIcons } from '../../material-table-icons';
import { DefaultLogTableProps } from '../default-report-interface';
import { format } from 'date-fns';

export type IngestorStateRowsType = {
  created: string; //date
  guid: string;
  state: string;
}[];

export interface IngestorStateReportTable extends DefaultLogTableProps {
  rows: IngestorStateRowsType | [];
}

export const IngestorStateReportTable = (props: IngestorStateReportTable): React.ReactElement => {
  const { rows, tableSize, addMoreRows } = props;

  return (
    <MaterialTable
      title="Ingestor State"
      icons={materialTableIcons}
      columns={[
        {
          title: <Typography>Guid</Typography>,
          field: 'level',
          type: 'string',
          render: (rowData) => {
            return <Typography>{rowData.guid}</Typography>;
          },
        },
        {
          title: <Typography>State</Typography>,
          field: 'message',
          type: 'string',
          render: (rowData) => {
            return <Typography>{rowData.state}</Typography>;
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
              <Typography data-testid={'ingestor-table-date'}>
                {format(new Date(rowData.created), 'MMM dd yyyy hh:mm aaa')}
              </Typography>
            );
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
