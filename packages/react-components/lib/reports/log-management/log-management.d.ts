import React from 'react';
import { LogRowsType } from './log-table';
export interface LogQueryPayload {
  toLogDate?: Date | null;
  fromLogDate?: Date | null;
  logLabel?: string | null;
  logLevel?: string | null;
  offset?: number | null;
}
export interface LogManagementProps {
  getLogs: (data: LogQueryPayload) => Promise<LogRowsType>;
  getLabels: () => Promise<
    {
      label: string;
      value: string;
    }[]
  >;
}
export declare const LogManagement: (props: LogManagementProps) => React.ReactElement;
