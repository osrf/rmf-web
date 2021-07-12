import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getTaskSummaryLogs } from '../utils.spec';
import { TaskSummaryReport } from './task-summary-report';

const getLogsPromise = async () => await getTaskSummaryLogs();

it('smoke test', async () => {
  await waitFor(() => {
    render(<TaskSummaryReport getLogs={getLogsPromise} />);
  });
});

it('does not show the table when the logs list is empty', async () => {
  await waitFor(() => {
    render(<TaskSummaryReport getLogs={async () => await []} />);
  });

  expect(screen.queryByText('Task Summary')).toBeFalsy();
});

it('calls the Retrieve Logs function when the button is clicked', async () => {
  const getLogsPromiseMock = jasmine.createSpy();
  const getLogsPromise = async () => {
    getLogsPromiseMock();
    return await getTaskSummaryLogs();
  };

  render(<TaskSummaryReport getLogs={getLogsPromise} />);
  const retrieveLogsButton = screen.getByRole('button', { name: /Retrieve Logs/i });
  expect(retrieveLogsButton).toBeTruthy();
  userEvent.click(retrieveLogsButton);
  expect(getLogsPromiseMock).toHaveBeenCalled();
});
