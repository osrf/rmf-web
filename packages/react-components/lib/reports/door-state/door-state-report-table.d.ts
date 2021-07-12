import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type DoorStateRowsType = {
  created: string;
  name: string;
  state: string;
  payload: string | unknown;
}[];
export interface DoorStateReportTable extends DefaultLogTableProps {
  rows: DoorStateRowsType | [];
}
export declare const DoorStateReportTable: (props: DoorStateReportTable) => React.ReactElement;
