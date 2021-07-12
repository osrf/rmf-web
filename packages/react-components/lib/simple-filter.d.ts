import React from 'react';
export interface OnChangeEvent {
  name?: string | undefined;
  value: string;
}
export interface SimpleFilterProps {
  onChange?: (e: React.ChangeEvent<OnChangeEvent>) => void;
  value: string;
}
export declare const SimpleFilter: (props: SimpleFilterProps) => JSX.Element;
