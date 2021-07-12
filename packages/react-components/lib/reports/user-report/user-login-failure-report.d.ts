import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { UserLoginFailureRowsType } from './user-login-failure-report-table';
export interface UserLoginFailureReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<UserLoginFailureRowsType>;
}
export declare const UserLoginFailureReport: (
  props: UserLoginFailureReportProps,
) => React.ReactElement;
export default UserLoginFailureReport;
