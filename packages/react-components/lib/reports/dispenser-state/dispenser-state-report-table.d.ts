import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type DispenserStateRowsType = {
  created: string;
  guid: string;
  state: string;
  payload: string | unknown;
}[];
export interface DispenserStateReportTable extends DefaultLogTableProps {
  rows: DispenserStateRowsType | [];
}
export declare const DispenserStateReportTable: (
  props: DispenserStateReportTable,
) => React.ReactElement;
