import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { UserLogoutRowsType } from './user-logout-report-table';
export interface UserLogoutReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<UserLogoutRowsType>;
}
export declare const UserLogoutReport: (props: UserLogoutReportProps) => React.ReactElement;
export default UserLogoutReport;
