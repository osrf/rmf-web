import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { FleetStateRowsType } from './fleet-state-report-table';
export interface FleetStateReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<FleetStateRowsType>;
}
export declare const FleetStateReport: (props: FleetStateReportProps) => React.ReactElement;
export default FleetStateReport;
