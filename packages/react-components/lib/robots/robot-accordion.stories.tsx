import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { RobotAccordion } from './robot-accordion';

export default {
  title: 'Robot Accordion',
  component: RobotAccordion,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

const baseRobot: RmfModels.RobotState = {
  name: 'test',
  battery_percent: 1,
  location: { level_name: 'test_level', x: 0, y: 0, yaw: 0, t: { sec: 0, nanosec: 0 }, index: 0 },
  mode: { mode: RmfModels.RobotMode.MODE_PAUSED, mode_request_id: 0 },
  model: 'test_model',
  task_id: 'test_task_id',
  path: [],
  seq: 0,
};

export const Basic: Story = (args) => (
  <RobotAccordion fleetName="test_fleet" robot={baseRobot} {...args} />
);
