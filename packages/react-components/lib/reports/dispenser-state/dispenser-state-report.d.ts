import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { DispenserStateRowsType } from './dispenser-state-report-table';
export interface DispenserStateReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<DispenserStateRowsType>;
}
export declare const DispenserStateReport: (props: DispenserStateReportProps) => React.ReactElement;
export default DispenserStateReport;
