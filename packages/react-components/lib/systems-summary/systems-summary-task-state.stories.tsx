import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { SystemSummaryTaskState, SystemSummaryTaskStateProps } from './systems-summary-task-state';

export default {
  title: 'Systems summary task state',
  component: SystemSummaryTaskState,
} as Meta;

const systemSummaryTaskStateData: SystemSummaryTaskStateProps = {
  tasks: [
    new RmfModels.TaskSummary({
      task_id: 'abc',
      state: 0,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    }),
    new RmfModels.TaskSummary({
      task_id: 'abc',
      state: 1,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    }),
    new RmfModels.TaskSummary({
      task_id: 'abc',
      state: 2,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    }),
    new RmfModels.TaskSummary({
      task_id: 'abc',
      state: 3,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    }),
  ],
  onClick: () => {
    /**filler */
  },
};

export const SystemSummaryTaskStateStory: Story = (args) => (
  <SystemSummaryTaskState
    tasks={systemSummaryTaskStateData.tasks}
    onClick={systemSummaryTaskStateData.onClick}
    {...args}
  />
);
