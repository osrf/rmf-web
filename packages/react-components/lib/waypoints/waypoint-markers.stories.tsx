import { Meta, Story } from '@storybook/react';
import React from 'react';
import { WaypointMarker } from './waypoint-marker';

export default {
  title: 'Waypoint Marker',
  component: WaypointMarker,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

export const Basic: Story = (args) => {
  return (
    <svg viewBox="-2 -2 4 4" width={400} height={400}>
      <WaypointMarker waypoint={{ name: 'test', params: [], x: 0, y: 0 }} {...args} />
    </svg>
  );
};

export const NoTranslate: Story = (args) => {
  return (
    <svg viewBox="-2 -2 4 4" width={400} height={400}>
      <WaypointMarker
        waypoint={{ name: 'test', params: [], x: 10, y: 10 }}
        translate={false}
        {...args}
      />
    </svg>
  );
};
