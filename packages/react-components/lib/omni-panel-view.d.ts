import React from 'react';
export interface OmniPanelViewProps extends React.PropsWithChildren<unknown> {
  viewId: number;
}
export declare const OmniPanelView: (props: OmniPanelViewProps) => JSX.Element;
export default OmniPanelView;
