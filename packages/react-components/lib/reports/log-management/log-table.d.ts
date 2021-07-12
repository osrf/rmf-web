import React from 'react';
export declare type LogRowsType = {
  level: string;
  message: string;
  created: string;
  container_name: string;
}[];
export interface LogTableProps {
  rows: LogRowsType | [];
  tableSize?: string;
  addMoreRows?(): void;
}
export declare const LogTable: (props: LogTableProps) => React.ReactElement;
