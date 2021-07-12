import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { UserLoginRowsType } from './user-login-report-table';
export interface UserLoginReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<UserLoginRowsType>;
}
export declare const UserLoginReport: (props: UserLoginReportProps) => React.ReactElement;
export default UserLoginReport;
