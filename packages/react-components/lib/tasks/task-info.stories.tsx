import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { TaskInfo, TaskInfoProps } from './task-info';
import { makeTask } from './test-data.spec';

export default {
  title: 'Tasks/Task Infos',
  component: TaskInfo,
} as Meta;

export const CleanTask: Story<TaskInfoProps> = (args) => {
  return <TaskInfo {...args}></TaskInfo>;
};

const cleanTask = makeTask('clean_task', 1, 1);
cleanTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_CLEAN;
cleanTask.task_profile.description.clean.start_waypoint = 'test_waypoint';

CleanTask.args = {
  task: cleanTask,
};

export const LoopTask: Story<TaskInfoProps> = (args) => {
  return <TaskInfo {...args}></TaskInfo>;
};

const loopTask = makeTask('loop_task', 1, 1);
loopTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_LOOP;
loopTask.task_profile.description.loop.start_name = 'test_waypoint_1';
loopTask.task_profile.description.loop.finish_name = 'test_waypoint_2';
loopTask.task_profile.description.loop.num_loops = 3;

LoopTask.args = {
  task: loopTask,
};

export const DeliveryTask: Story<TaskInfoProps> = (args) => {
  return <TaskInfo {...args}></TaskInfo>;
};

const deliveryTask = makeTask('delivery_task', 1, 1);
deliveryTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_DELIVERY;
deliveryTask.task_profile.description.delivery.pickup_place_name = 'test_waypoint_1';
deliveryTask.task_profile.description.delivery.pickup_dispenser = 'test_dispenser';
deliveryTask.task_profile.description.delivery.dropoff_place_name = 'test_waypoint_2';
deliveryTask.task_profile.description.delivery.dropoff_ingestor = 'test_ingestor';

DeliveryTask.args = {
  task: deliveryTask,
};
