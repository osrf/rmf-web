import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { DoorStateRowsType } from './door-state-report-table';
export interface DoorStateReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<DoorStateRowsType>;
}
export declare const DoorStateReport: (props: DoorStateReportProps) => React.ReactElement;
export default DoorStateReport;
