import { render } from '@testing-library/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { makeTask } from '../tasks/test-data.spec';
import { RobotInfo } from './robot-info';
import { makeRandomRobot } from './test-utils.spec';

describe('RobotInfo', () => {
  it('information renders correctly', () => {
    const robot = makeRandomRobot('test_robot', 'test_fleet', 1);
    const deliveryTask = makeTask('delivery_task', 1, 1);
    deliveryTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_DELIVERY;
    deliveryTask.task_profile.description.delivery.pickup_place_name = 'test_waypoint_1';
    deliveryTask.task_profile.description.delivery.pickup_dispenser = 'test_dispenser';
    deliveryTask.task_profile.description.delivery.dropoff_place_name = 'test_waypoint_2';
    deliveryTask.task_profile.description.delivery.dropoff_ingestor = 'test_ingestor';
    const task = { task_summary: deliveryTask, progress: 10 };

    const robot1 = { ...robot, tasks: [task] };

    const root = render(
      <>
        <RobotInfo robot={robot1} />
      </>,
    );

    expect(root.getByRole('heading', { name: 'test_robot' })).toBeTruthy();
    expect(root.getByRole('button', { name: 'delivery_task' })).toBeTruthy();
    expect(root.getByRole('button', { name: 'test_waypoint_1' })).toBeTruthy();
    expect(root.getByRole('button', { name: 'test_waypoint_2' })).toBeTruthy();
  });
});
