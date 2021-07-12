import React from 'react';
import { OmniPanelViewProps } from './omni-panel-view';
export interface OmniPanelProps extends React.HTMLProps<HTMLDivElement> {
  stack: (number | string)[];
  children: React.ReactElement<OmniPanelViewProps>[] | React.ReactElement<OmniPanelViewProps>;
  variant?: 'backHome' | 'backHomeClose';
  timeout?: number;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onBack?: React.MouseEventHandler<HTMLButtonElement>;
  onHome?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare const OmniPanel: (props: OmniPanelProps) => JSX.Element;
export default OmniPanel;
