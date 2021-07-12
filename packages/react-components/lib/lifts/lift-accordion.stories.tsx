import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { LiftAccordion } from './lift-accordion';

export default {
  title: 'Lift Accordion',
  component: LiftAccordion,
} as Meta;

const lifts = [
  {
    name: 'Lift1',
    doors: [
      {
        name: 'lift1_front_door',
        v1_x: 8.8,
        v1_y: -2.3,
        v2_x: 7.7,
        v2_y: -4.5,
        door_type: 1,
        motion_range: 0,
        motion_direction: 1,
      },
    ],
    levels: ['L1', 'L2', 'L3'],
    ref_x: 7.1,
    ref_y: -2.8,
    ref_yaw: 0.5,
    width: 2.5,
    depth: 2.5,
    wall_graph: {
      name: 'wallgraph',
      vertices: [],
      edges: [],
      params: [],
    },
  },
  {
    name: 'Lift2',
    doors: [
      {
        name: 'lift2_front_door',
        v1_x: 8.95,
        v1_y: -12.38,
        v2_x: 10.08,
        v2_y: -12.38,
        door_type: 1,
        motion_range: 0,
        motion_direction: 1,
      },
    ],
    levels: ['L1', 'L2', 'L3', 'L4'],
    ref_x: 9.5,
    ref_y: -13,
    ref_yaw: 1.571,
    width: 1,
    depth: 1,
    wall_graph: {
      name: 'wallgraph',
      vertices: [],
      edges: [],
      params: [],
    },
  },
  {
    name: 'mysterious_lift',
    doors: [],
    levels: ['L1', 'L2', 'L3', 'L4'],
    ref_x: 22,
    ref_y: -10,
    ref_yaw: 1.571,
    width: 1,
    depth: 1,
    wall_graph: {
      name: 'wallgraph',
      vertices: [],
      edges: [],
      params: [],
    },
  },
];

const liftStates: Record<string, RmfModels.LiftState> = {
  Lift1: {
    lift_name: 'Lift1',
    available_floors: ['L1', 'L2', 'L3'],
    available_modes: new Uint8Array([RmfModels.LiftState.MODE_AGV]),
    current_floor: 'L1',
    current_mode: RmfModels.LiftState.MODE_AGV,
    destination_floor: 'L1',
    door_state: RmfModels.LiftState.DOOR_OPEN,
    lift_time: { sec: 0, nanosec: 0 },
    motion_state: RmfModels.LiftState.MOTION_STOPPED,
    session_id: '',
  },
  Lift2: {
    lift_name: 'Lift2',
    available_floors: ['L1', 'L2', 'L3', 'L4'],
    available_modes: new Uint8Array([RmfModels.LiftState.MODE_AGV]),
    current_floor: 'L2',
    current_mode: RmfModels.LiftState.MODE_FIRE,
    destination_floor: 'L4',
    door_state: RmfModels.LiftState.DOOR_CLOSED,
    lift_time: { sec: 0, nanosec: 0 },
    motion_state: RmfModels.LiftState.MOTION_UP,
    session_id: '',
  },
};

export const LiftsPanel: Story = (args) => {
  return (
    <>
      {lifts.map((lift) => (
        <LiftAccordion key={lift.name} lift={lift} liftState={liftStates[lift.name]} {...args} />
      ))}
    </>
  );
};
