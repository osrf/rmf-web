import React from 'react';
export interface CircularProgressBarProps {
  progress: number;
  strokeColor: string;
  children?: React.ReactNode;
}
export declare function CircularProgressBar(props: CircularProgressBarProps): JSX.Element;
