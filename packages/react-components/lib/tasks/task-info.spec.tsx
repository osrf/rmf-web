import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { TaskInfo } from './task-info';
import { makeTask } from './test-data.spec';

describe('TaskInfo', () => {
  it('smoke test', () => {
    const cleanTask = makeTask('clean_task', 1, 1);
    cleanTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_CLEAN;
    cleanTask.task_profile.description.clean.start_waypoint = 'test_waypoint';

    const loopTask = makeTask('loop_task', 1, 1);
    loopTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_LOOP;
    loopTask.task_profile.description.loop.start_name = 'test_waypoint_1';
    loopTask.task_profile.description.loop.finish_name = 'test_waypoint_2';
    loopTask.task_profile.description.loop.num_loops = 3;

    const deliveryTask = makeTask('delivery_task', 1, 1);
    deliveryTask.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_DELIVERY;
    deliveryTask.task_profile.description.delivery.pickup_place_name = 'test_waypoint_1';
    deliveryTask.task_profile.description.delivery.pickup_dispenser = 'test_dispenser';
    deliveryTask.task_profile.description.delivery.dropoff_place_name = 'test_waypoint_2';
    deliveryTask.task_profile.description.delivery.dropoff_ingestor = 'test_ingestor';

    render(
      <>
        <TaskInfo task={cleanTask} />
        <TaskInfo task={loopTask} />
        <TaskInfo task={deliveryTask} />
      </>,
    );
  });

  it('onCancelTaskClick is called when cancel task button is clicked', () => {
    const task = makeTask('clean_task', 1, 1);
    const spy = jasmine.createSpy();
    const root = render(<TaskInfo task={task} onCancelTaskClick={spy} />);
    userEvent.click(root.getByLabelText('Cancel Task'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
