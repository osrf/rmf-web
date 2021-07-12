import React from 'react';
interface SearchFilterProps {
  options: {
    label: string;
    value: string;
  }[];
  handleOnChange: (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
  ) => void;
  label: string;
  name: string;
  currentValue: string | number;
}
export declare const SearchFilter: (props: SearchFilterProps) => React.ReactElement;
export {};
