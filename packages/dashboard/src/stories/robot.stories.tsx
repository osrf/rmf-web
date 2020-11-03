import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import ColorManager from '../components/schedule-visualizer/colors';
import RobotBenchmark from './baseComponents/robot-benchmark';
import RobotComponent from './baseComponents/robot-component';
import RobotGallery from './baseComponents/robot-gallery';
import {
  componentDisplayStyle,
  defaultStyles,
  robotState,
  robotStates,
  StyleTyping,
} from './baseComponents/utils';

export default {
  title: 'Robot',
};

const styles: StyleTyping = {
  ...defaultStyles,
  example: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
  },
};

const colorManager = new ColorManager();

const renderInfoPanel = (robotMode: string, footprint: number): JSX.Element => {
  return (
    <div style={componentDisplayStyle.modeInfoPanel}>
      <Typography align="center" variant="h5">
        Configurations
      </Typography>

      <div style={componentDisplayStyle.modeInfoItem}>
        <Typography variant="body1">Robot Mode:</Typography>
        <Typography variant="body1">{robotMode}</Typography>
      </div>

      <Divider />

      <div style={componentDisplayStyle.modeInfoItem}>
        <Typography variant="body1">footprint:</Typography>
        <Typography variant="body1">{footprint}</Typography>
      </div>

      <Divider />

      <div style={componentDisplayStyle.modeInfoLink}>
        <Typography variant="body1">
          Click
          <a
            style={componentDisplayStyle.aTag}
            href="https://osrf.github.io/romi-js-core-interfaces/classes/robotmode.html"
          >
            {' '}
            here{' '}
          </a>
          for more details on Robot Modes and
          <a
            style={componentDisplayStyle.aTag}
            href="https://osrf.github.io/romi-js-core-interfaces/classes/robotstate.html"
          >
            {' '}
            here{' '}
          </a>
          for more details on Robot States.
        </Typography>
      </div>
    </div>
  );
};

export const robotDefaultIcon = () => (
  <RobotComponent
    fleetName={robotStates[0].name}
    robot={robotState}
    footprint={1}
    colorManager={colorManager}
    renderInfoPanel={() => renderInfoPanel('Idle', 1)}
  />
);

export const gallery = () => <RobotGallery />;

export const benchmark = () => <RobotBenchmark />;
