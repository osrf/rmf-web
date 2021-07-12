import React from 'react';
export interface ErrorOverlayProps {
  errorMsg?: string | null;
  children: React.ReactNode | null;
  overrideErrorStyle?: string;
}
export declare const ErrorOverlay: React.MemoExoticComponent<
  (props: ErrorOverlayProps) => JSX.Element
>;
