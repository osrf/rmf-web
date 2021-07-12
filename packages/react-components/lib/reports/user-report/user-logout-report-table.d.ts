import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type UserLogoutRowsType = {
  created: string;
  ip_address: string;
  payload: string | unknown;
  user_id: string;
  username: string;
}[];
export interface UserLogoutReportTable extends DefaultLogTableProps {
  rows: UserLogoutRowsType;
}
export declare const UserLogoutReportTable: (props: UserLogoutReportTable) => React.ReactElement;
