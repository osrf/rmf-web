import { render } from '@testing-library/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { TaskTable } from './task-table';
import { makeTask } from './test-data.spec';

describe('TaskTable', () => {
  it('shows all tasks', () => {
    const tasks = [makeTask('task_0', 3, 3), makeTask('task_1', 2, 2)];
    const root = render(<TaskTable tasks={tasks} />);
    root.getByText('task_0');
    root.getByText('task_1');
  });

  it('smoke test for different task states', () => {
    const activeTask = makeTask('active_task', 3, 3);
    activeTask.state = RmfModels.TaskSummary.STATE_ACTIVE;
    const cancelledTask = makeTask('cancelled_task', 3, 3);
    cancelledTask.state = RmfModels.TaskSummary.STATE_CANCELED;
    const completedTask = makeTask('completed_task', 3, 3);
    completedTask.state = RmfModels.TaskSummary.STATE_COMPLETED;
    const failedTask = makeTask('failed_task', 3, 3);
    failedTask.state = RmfModels.TaskSummary.STATE_FAILED;
    const pendingTask = makeTask('pending_task', 3, 3);
    pendingTask.state = RmfModels.TaskSummary.STATE_PENDING;
    const queuedTask = makeTask('queuedTask', 3, 3);
    queuedTask.state = RmfModels.TaskSummary.STATE_QUEUED;

    const tasks = [activeTask, cancelledTask, completedTask, failedTask, pendingTask, queuedTask];
    render(<TaskTable tasks={tasks} />);
  });
});
