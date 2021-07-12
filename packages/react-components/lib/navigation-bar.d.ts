import React from 'react';
export interface NavigationBarProps {
  value?: string;
  onTabChange?(event: React.ChangeEvent<unknown>, newValue: unknown): void;
  children?: React.ReactNode;
}
export declare const NavigationBar: (props: NavigationBarProps) => JSX.Element;
