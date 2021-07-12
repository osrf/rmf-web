import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import {
  SystemSummarySpoiltItems,
  SystemSummarySpoiltItemsProps,
} from './systems-summary-spoilt-items';

export default {
  title: 'Systems summary spoilt items',
  component: SystemSummarySpoiltItems,
} as Meta;

const spoiltEquipment: SystemSummarySpoiltItemsProps = {
  doors: [
    {
      door: {
        name: 'hardware_door',
        v1_x: 4.9,
        v1_y: -4,
        v2_x: 4.4,
        v2_y: -5,
        door_type: 1,
        motion_range: 1.571,
        motion_direction: -1,
      },
      name: 'hardware_door',
      state: 'unknown',
    },
  ],
  lifts: [
    {
      name: 'lift',
      state: 'unknown',
      lift: {
        name: 'lift',
        doors: [],
        levels: ['L1', 'L2', 'L3'],
        ref_x: 7.1,
        ref_y: -2.8,
        ref_yaw: -0.5,
        width: 2.5,
        depth: 2.5,
        wall_graph: {
          name: 'wallgraph',
          vertices: [],
          edges: [],
          params: [],
        },
      },
    },
  ],
  dispensers: [
    {
      name: 'dispenser',
      state: 'unknown',
      dispenser: 'dispenser',
    },
  ],
  robots: [
    {
      name: 'robot',
      state: 'state',
      robot: new RmfModels.RobotState({
        name: 'robot',
        model: 'Model1',
        mode: new RmfModels.RobotMode({ mode: RmfModels.RobotMode.MODE_EMERGENCY }),
        location: new RmfModels.Location({
          level_name: 'L1',
          x: 4,
          y: -12,
          yaw: 0,
          t: { sec: 0, nanosec: 0 },
        }),
        battery_percent: 100,
        path: [],
        task_id: 'task1',
      }),
      fleet: 'fleet',
    },
  ],
};

export const SystemSummarySpoiltItemStory: Story = (args) => (
  <SystemSummarySpoiltItems
    doors={spoiltEquipment.doors}
    lifts={spoiltEquipment.lifts}
    dispensers={spoiltEquipment.dispensers}
    robots={spoiltEquipment.robots}
    {...args}
  />
);
