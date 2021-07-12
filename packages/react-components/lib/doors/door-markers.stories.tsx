import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { DoorMarker } from './door-marker';
import { makeDoor, makeDoorState } from './test-utils.spec';

export default {
  title: 'Door Markers',
  component: DoorMarker,
} as Meta;

function makeStory(door: RmfModels.Door, doorState?: RmfModels.DoorState): Story {
  return (args) => (
    <svg viewBox="-2 -2 4 4" width={400} height={400}>
      <DoorMarker door={door} doorMode={doorState?.current_mode.value || undefined} {...args} />
    </svg>
  );
}

export const SingleSwing = makeStory(
  makeDoor({ door_type: RmfModels.Door.DOOR_TYPE_SINGLE_SWING }),
);
export const SingleSliding = makeStory(
  makeDoor({ door_type: RmfModels.Door.DOOR_TYPE_SINGLE_SLIDING }),
);
export const SingleTelescope = makeStory(
  makeDoor({ door_type: RmfModels.Door.DOOR_TYPE_SINGLE_TELESCOPE }),
);
export const DoubleSwing = makeStory(
  makeDoor({ door_type: RmfModels.Door.DOOR_TYPE_DOUBLE_SWING }),
);
export const DoubleSliding = makeStory(
  makeDoor({ door_type: RmfModels.Door.DOOR_TYPE_DOUBLE_SLIDING }),
);
export const DoubleTelescope = makeStory(
  makeDoor({ door_type: RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE }),
);

export const SingleSwingOpened = makeStory(
  makeDoor(),
  makeDoorState({ current_mode: { value: RmfModels.DoorMode.MODE_OPEN } }),
);
SingleSwingOpened.storyName = 'Single Swing (Opened)';
export const SingleSwingMoving = makeStory(
  makeDoor(),
  makeDoorState({ current_mode: { value: RmfModels.DoorMode.MODE_MOVING } }),
);
SingleSwingMoving.storyName = 'Single Swing (Moving)';
export const SingleSwingClosed = makeStory(
  makeDoor(),
  makeDoorState({ current_mode: { value: RmfModels.DoorMode.MODE_CLOSED } }),
);
SingleSwingClosed.storyName = 'Single Swing (Closed)';

// Door would be outside the viewbox if it is translated to RMF coords.
export const NoTranslate: Story = (args) => {
  const door = makeDoor({ v1_x: 10, v1_y: 10, v2_x: 11, v2_y: 11 });
  return (
    <svg viewBox="-2 -2 4 4" width={400} height={400}>
      <DoorMarker door={door} translate={false} {...args} />
    </svg>
  );
};
