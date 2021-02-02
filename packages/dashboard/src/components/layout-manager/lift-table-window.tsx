import { LiftTable } from 'react-components';
import { MosaicWindow, MosaicBranch } from 'react-mosaic-component';
import './layout-manager.css';
import * as RomiCore from '@osrf/romi-js-core-interfaces';
import React from 'react';

const lifts: RomiCore.LiftState[] = [];

export interface LiftTableWindowProps extends React.HTMLProps<HTMLDivElement> {
  path: MosaicBranch[];
}

export default function LiftTableWindow(props: LiftTableWindowProps): React.ReactElement {
  return (
    <MosaicWindow<string>
      path={props.path}
      className="layout-manager-theme"
      title="Lifts"
      toolbarControls={[]}
    >
      <LiftTable lifts={lifts} />
    </MosaicWindow>
  );
}
