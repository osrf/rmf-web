import { Meta, Story } from '@storybook/react';
import React from 'react';
import { makeDefinedTask } from '../tasks/test-data.spec';
import { RobotPanel as RobotPanel_, RobotPanelProps } from './robot-panel';
import { makeRandomRobot } from './test-utils.spec';
import { VerboseRobot } from './utils';

export default {
  title: 'Robots/Robot Panel',
  component: RobotPanel_,
  argTypes: {
    fetchTasks: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

export const RobotPanel: Story<RobotPanelProps> = (args) => {
  return (
    <>
      <RobotPanel_
        {...args}
        style={{ height: '95vh', margin: 'auto', maxWidth: 1600 }}
      ></RobotPanel_>
    </>
  );
};

const verboseRobots: VerboseRobot[] = [
  {
    ...makeRandomRobot('test_robot1', 'test_fleet', 2),
    tasks: [makeDefinedTask('Delivery', 'test_robot1', 'active_task_1', 3, 3)],
  },
  {
    ...makeRandomRobot('test_robot2', 'test_fleet', 1),
    tasks: [makeDefinedTask('Loop', 'test_robot2', 'active_task_2', 4, 3)],
  },
  {
    ...makeRandomRobot('test_robot3', 'test_fleet', 3),
    tasks: [makeDefinedTask('Clean', 'test_robot3', 'active_task_3', 4, 3)],
  },
  {
    ...makeRandomRobot('test_robot4', 'test_fleet', 4),
    tasks: [makeDefinedTask('Loop', 'test_robot4', 'active_task_4', 4, 3)],
  },
];

async function fetchVerboseRobots(): Promise<VerboseRobot[]> {
  return verboseRobots;
}

RobotPanel.args = {
  fetchVerboseRobots,
  verboseRobots,
};
