import { Meta, Story } from '@storybook/react';
import React from 'react';
import { makeTrajectory } from './test-utils.spec';
import { TrajectoryMarker, TrajectoryMarkerProps } from './trajectory-marker';

export default {
  title: 'Trajectory Markers',
  component: TrajectoryMarker,
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
    trajectory: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const trajectory = makeTrajectory();

export const Basic: Story<Omit<TrajectoryMarkerProps, 'trajectory'>> = (args) => {
  return (
    <svg viewBox="-2 -2 16 16" width={400} height={400}>
      <TrajectoryMarker trajectory={trajectory} {...args} />
    </svg>
  );
};
Basic.args = {
  color: 'green',
  animationLoop: true,
  variant: 'follow',
};
