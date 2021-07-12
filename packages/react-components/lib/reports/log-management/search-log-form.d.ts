import React from 'react';
import { LogQueryPayload } from '.';
interface SearchLogFormProps {
  logLabelValues: {
    label: string;
    value: string;
  }[];
  search?: (payload: LogQueryPayload) => void;
}
export declare const SearchLogForm: (props: SearchLogFormProps) => React.ReactElement;
export {};
