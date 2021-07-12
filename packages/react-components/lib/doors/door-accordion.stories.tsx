import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { DoorAccordion } from './door-accordion';
import { DoorMode, DoorMotion, DoorType } from './enums';
import { makeDoor, makeDoorState } from './test-utils.spec';

export default {
  title: 'Door Accordion',
  component: DoorAccordion,
  argTypes: {
    door: {
      table: {
        disable: true,
      },
    },
    doorState: {
      table: {
        disable: true,
      },
    },
    name: {
      control: {
        type: 'text',
      },
    },
    door_type: {
      control: {
        type: 'select',
        options: Object.values(DoorType).filter((k) => typeof k === 'string'),
      },
    },
    motion_direction: {
      control: {
        type: 'select',
        options: Object.values(DoorMotion).filter((k) => typeof k === 'string'),
      },
    },
    current_mode: {
      control: {
        type: 'select',
        options: Object.values(DoorMode).filter((k) => typeof k === 'string'),
      },
    },
  },
} as Meta;

const doors = [
  {
    name: 'main_door',
    v1_x: 8.2,
    v1_y: -5.5,
    v2_x: 7.85,
    v2_y: -6.2,
    door_type: 2,
    motion_range: -1.571,
    motion_direction: 1,
  },
  {
    name: 'hardware_door',
    v1_x: 4.9,
    v1_y: -4,
    v2_x: 4.4,
    v2_y: -5,
    door_type: 1,
    motion_range: 1.571,
    motion_direction: -1,
  },
  {
    name: 'coe_door',
    v1_x: 19.5,
    v1_y: -10.8,
    v2_x: 19.5,
    v2_y: -9.9,
    door_type: 1,
    motion_range: 1.571,
    motion_direction: 1,
  },
  {
    name: 'exit_door',
    v1_x: 12.2,
    v1_y: -2.7,
    v2_x: 14.1,
    v2_y: -2.7,
    door_type: 1,
    motion_range: -1.571,
    motion_direction: 1,
  },
];

const doorStates: Record<string, RmfModels.DoorState> = {
  coe_door: {
    door_name: 'coe_door',
    current_mode: { value: RmfModels.DoorMode.MODE_OPEN },
    door_time: { sec: 0, nanosec: 0 },
  },
  hardware_door: {
    door_name: 'hardware_door',
    current_mode: { value: RmfModels.DoorMode.MODE_CLOSED },
    door_time: { sec: 0, nanosec: 0 },
  },
  exit_door: {
    door_name: 'exit_door',
    current_mode: { value: RmfModels.DoorMode.MODE_MOVING },
    door_time: { sec: 0, nanosec: 0 },
  },
};

export const Basic: Story = ({
  name,
  door_type,
  motion_direction,
  motion_range,
  current_mode,
  ...args
}) => {
  const door = React.useMemo(
    () =>
      makeDoor({
        name: name,
        door_type: DoorType[door_type as keyof typeof DoorType],
        motion_direction: DoorMotion[motion_direction as keyof typeof DoorMotion],
        motion_range,
      }),
    [name, door_type, motion_direction, motion_range],
  );
  const state = React.useMemo(
    () =>
      makeDoorState({
        door_name: name,
        current_mode: { value: DoorMode[current_mode as keyof typeof DoorMode] },
      }),
    [name, current_mode],
  );
  return <DoorAccordion door={door} doorState={state} {...args} />;
};
Basic.args = {
  name: 'Basic Door',
  door_type: 'SingleSwing' as keyof typeof DoorType,
  motion_direction: 'Clockwise' as keyof typeof DoorMotion,
  motion_range: 1.571,
  current_mode: 'Open' as keyof typeof DoorMode,
};

export const DoorsPanel: Story = (args) => {
  return (
    <>
      {doors.map((door) => (
        <DoorAccordion key={door.name} door={door} doorState={doorStates[door.name]} {...args} />
      ))}
    </>
  );
};
