import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { TaskPanel, TaskPanelProps } from './task-panel';
import { makeTask } from './test-data.spec';

describe('TaskPanel', () => {
  describe('task detail', () => {
    const mount = async (cancelTask?: TaskPanelProps['cancelTask']) => {
      const task = makeTask('test_task', 3, 3);
      task.task_profile.description.task_type.type = RmfModels.TaskType.TYPE_CLEAN;
      task.task_profile.description.clean.start_waypoint = 'test_waypoint';
      const root = render(<TaskPanel tasks={[task]} cancelTask={cancelTask} />);
      userEvent.click(await root.findByText('test_task'));
      return root;
    };

    it('is shown when task is clicked', async () => {
      const root = await mount();
      root.getByText('test_waypoint');
    });

    it('success snackbar is shown when task is successfully cancelled', async () => {
      const cancelTask = () => Promise.resolve(undefined);
      const root = await mount(cancelTask);
      userEvent.click(root.getByLabelText('Cancel Task'));
      await waitFor(() => root.getByText('Successfully cancelled task'));
    });

    it('error snackbar is shown when task failed to cancel', async () => {
      const cancelTask = () => Promise.reject(new Error('test error'));
      const root = await mount(cancelTask);
      userEvent.click(root.getByLabelText('Cancel Task'));
      await waitFor(() => root.getByText('Failed to cancel task: test error'));
    });
  });

  describe('create task', () => {
    it('clicking on create task button opens the create task form', () => {
      const root = render(<TaskPanel tasks={[]} />);
      userEvent.click(root.getByLabelText('Create Task'));
      root.getByText('Create Task');
    });

    it('closing the create task form reset its states', () => {
      const root = render(<TaskPanel tasks={[]} />);
      userEvent.click(root.getByLabelText('Create Task'));
      let priorityEl = root.getByLabelText('Priority') as HTMLInputElement;
      userEvent.clear(priorityEl);
      userEvent.type(priorityEl, '2');
      expect(priorityEl.value).toBe('2');

      userEvent.click(root.getByLabelText('Cancel'));
      userEvent.click(root.getByLabelText('Create Task'));
      priorityEl = root.getByLabelText('Priority') as HTMLInputElement;
      expect(priorityEl.value).toBe('0');
    });
  });

  it('success snackbar is shown when successfully created a task', async () => {
    const spy = jasmine.createSpy().and.resolveTo(undefined);
    const root = render(<TaskPanel tasks={[]} submitTasks={spy} />);
    userEvent.click(root.getByLabelText('Create Task'));
    userEvent.click(root.getByLabelText('Submit'));
    await waitFor(() => root.getByText('Successfully created task'));
  });

  it('failure snackbar is shown when failed to created a task', async () => {
    const spy = jasmine.createSpy().and.rejectWith(new Error('error!!'));
    const root = render(<TaskPanel tasks={[]} submitTasks={spy} />);
    userEvent.click(root.getByLabelText('Create Task'));
    userEvent.click(root.getByLabelText('Submit'));
    await waitFor(() => root.getByText('Failed to create task', { exact: false }));
  });

  it('pagination is shown when pagination option is provided', () => {
    const spy = jasmine.createSpy();
    const root = render(
      <TaskPanel
        tasks={[makeTask('test', 1, 1)]}
        paginationOptions={{
          count: 1,
          page: 0,
          rowsPerPage: 10,
          rowsPerPageOptions: [10],
          onChangePage: spy,
        }}
      />,
    );
    root.getByText('1-1 of 1');
  });

  it('clicking on auto refresh button toggles auto refresh', () => {
    const spy = jasmine.createSpy();
    const root = render(<TaskPanel tasks={[]} onAutoRefresh={spy} />);
    userEvent.click(root.getByLabelText('Disable auto refresh'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.mostRecent().args[0]).toBe(false);
    userEvent.click(root.getByLabelText('Enable auto refresh'));
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.calls.mostRecent().args[0]).toBe(true);
  });

  it('clicking on refresh button triggers onRefresh', () => {
    const spy = jasmine.createSpy();
    const root = render(<TaskPanel tasks={[]} onRefresh={spy} />);
    userEvent.click(root.getByLabelText('Refresh'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
