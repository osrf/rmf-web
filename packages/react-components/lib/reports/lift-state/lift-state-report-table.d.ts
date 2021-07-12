import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type LiftStateRowsType = {
  created: string;
  state: string;
  door_state: string;
  destination_floor: string;
  motion_state: string;
  current_floor: string;
  session_id: string;
  payload: string | unknown;
}[];
export interface LiftStateReportTable extends DefaultLogTableProps {
  rows: LiftStateRowsType | [];
}
export declare const LiftStateReportTable: (props: LiftStateReportTable) => React.ReactElement;
