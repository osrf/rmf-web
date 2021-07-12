import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { LiftStateRowsType } from './lift-state-report-table';
export interface LiftStateReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<LiftStateRowsType>;
}
export declare const LiftStateReport: (props: LiftStateReportProps) => React.ReactElement;
export default LiftStateReport;
