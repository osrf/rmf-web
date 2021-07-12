import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type IngestorStateRowsType = {
  created: string;
  guid: string;
  state: string;
  payload: string | unknown;
}[];
export interface IngestorStateReportTable extends DefaultLogTableProps {
  rows: IngestorStateRowsType | [];
}
export declare const IngestorStateReportTable: (
  props: IngestorStateReportTable,
) => React.ReactElement;
