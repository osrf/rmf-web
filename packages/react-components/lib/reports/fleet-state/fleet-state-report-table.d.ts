import React from 'react';
import { DefaultLogTableProps } from '../default-report-interface';
export declare type FleetStateRowsType = {
  created: string;
  payload: string | unknown;
  fleet_name: string;
  robots: string;
  robot_battery_percent: string;
  robot_location: string;
  robot_mode: string;
  robot_model: string;
  robot_name: string;
  robot_seq: number;
  robot_task_id: string;
}[];
export interface FleetStateReportTable extends DefaultLogTableProps {
  rows: FleetStateRowsType | [];
}
export declare const FleetStateReportTable: (props: FleetStateReportTable) => React.ReactElement;
