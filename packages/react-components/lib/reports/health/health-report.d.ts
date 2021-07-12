import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { HealthRowsType } from './health-report-table';
export interface HealthReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<HealthRowsType>;
}
export declare const HealthReport: (props: HealthReportProps) => React.ReactElement;
export default HealthReport;
