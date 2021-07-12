import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type HealthRowsType = {
  created: string;
  device: string;
  actor_id: string;
  health_status: string;
  health_message: string;
  payload: string | unknown;
}[];
export interface HealthReportTable extends DefaultLogTableProps {
  rows: HealthRowsType | [];
}
export declare const HealthReportTable: (props: HealthReportTable) => React.ReactElement;
