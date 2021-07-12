import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { LiftMarker, LiftMarkerProps } from './lift-marker';
import { makeLift, makeLiftState } from './test-utils.spec';

export default {
  title: 'Lift Markers',
  component: LiftMarker,
} as Meta;

function makeStory(
  lift: RmfModels.Lift,
  liftState?: RmfModels.LiftState,
  variant?: LiftMarkerProps['variant'],
): Story {
  return (args) => (
    <svg viewBox="-2 -2 4 4" width={400} height={400}>
      <LiftMarker lift={lift} liftState={liftState} variant={variant} {...args} />
    </svg>
  );
}

export const Basic = makeStory(makeLift(), makeLiftState());

export const UnknownState = makeStory(makeLift(), undefined, 'unknown');

export const Rotated = makeStory(
  makeLift({
    ref_yaw: Math.PI / 4,
    doors: [
      {
        name: 'door',
        door_type: RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE,
        motion_direction: 1,
        motion_range: Math.PI / 2,
        v1_x: -1.414,
        v1_y: 0,
        v2_x: 0,
        v2_y: -1.414,
      },
    ],
  }),
  makeLiftState(),
);

export const LongLongLift = makeStory(
  makeLift({
    width: 4,
    depth: 2,
    doors: [
      {
        name: 'door',
        door_type: RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE,
        motion_direction: 1,
        motion_range: Math.PI / 2,
        v1_x: -2,
        v1_y: -1,
        v2_x: 2,
        v2_y: -1,
      },
    ],
  }),
  makeLiftState(),
);

export const NoTranslate: Story = (args) => (
  <svg viewBox="-2 -2 4 4" width={400} height={400}>
    <LiftMarker
      lift={makeLift({
        ref_x: 10,
        ref_y: 10,
        width: 2,
        depth: 2,
        doors: [
          {
            name: 'door',
            door_type: RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE,
            motion_direction: 1,
            motion_range: Math.PI / 2,
            v1_x: 9,
            v1_y: 9,
            v2_x: 11,
            v2_y: 9,
          },
        ],
      })}
      translate={false}
      {...args}
    />
  </svg>
);
