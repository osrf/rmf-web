import { Meta, Story } from '@storybook/react';
import React from 'react';
import { TrajectoryMarker, TrajectoryMarkerProps } from '../../lib';
import { createRandomTrajectories } from '../../lib/robots/test-utils.spec';

export default {
  title: 'Benchmarks/Trajectories',
  argTypes: {
    count: {
      name: 'Count',
    },
    conflict: {
      name: 'Conflict',
    },
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['fill', 'follow', 'plain'] as TrajectoryMarkerProps['variant'][],
      },
    },
  },
} as Meta;

export const TrajectoryMarkers: Story = ({ count, conflict, variant, ...args }) => {
  const trajectories = React.useMemo(() => createRandomTrajectories(count), [count]);

  return (
    <svg viewBox="0 0 20 20" style={{ width: '100%', height: '100%', position: 'absolute' }}>
      {trajectories.map((traj) => (
        <TrajectoryMarker
          key={traj.id}
          color="green"
          conflict={conflict}
          trajectory={traj}
          animationLoop={true}
          animationScale={4}
          variant={variant}
          {...args}
        />
      ))}
    </svg>
  );
};
TrajectoryMarkers.args = {
  count: 100,
  conflict: false,
  variant: 'follow' as TrajectoryMarkerProps['variant'],
};
