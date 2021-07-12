import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type UserLoginFailureRowsType = {
  created: string;
  ip_address: string;
  payload: string | unknown;
  client_id: string;
  username: string;
  error: string;
}[];
export interface UserLoginFailureReportTable extends DefaultLogTableProps {
  rows: UserLoginFailureRowsType;
}
export declare const UserLoginFailureReportTable: (
  props: UserLoginFailureReportTable,
) => React.ReactElement;
