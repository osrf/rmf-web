import React from 'react';
import { DefaultReportQueryPayload } from '../default-report-interface';
import { IngestorStateRowsType } from './ingestor-state-report-table';
export interface IngestorStateReportProps {
  getLogs: (data: DefaultReportQueryPayload) => Promise<IngestorStateRowsType>;
}
export declare const IngestorStateReport: (props: IngestorStateReportProps) => React.ReactElement;
export default IngestorStateReport;
