import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type UserLoginRowsType = {
  client_id: string;
  created: string;
  ip_address: string;
  payload: string | unknown;
  user_id: string;
  username: string;
}[];
export interface UserLoginReportTable extends DefaultLogTableProps {
  rows: UserLoginRowsType;
}
export declare const UserLoginReportTable: (props: UserLoginReportTable) => React.ReactElement;
