import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getDoorLogs } from '../utils.spec';
import { DoorStateReport } from './door-state-report';

const getLogsPromise = async () => await getDoorLogs();

it('smoke test', async () => {
  await waitFor(() => {
    render(<DoorStateReport getLogs={getLogsPromise} />);
  });
});

it('doesn`t shows the table when logs list is empty', async () => {
  await waitFor(() => {
    render(<DoorStateReport getLogs={async () => await []} />);
  });

  expect(screen.queryByText('Door State')).toBeFalsy();
});

it('calls the retrieve log function when the button is clicked', async () => {
  const getLogsPromiseMock = jasmine.createSpy();
  const getLogsPromise = async () => {
    getLogsPromiseMock();
    return await getDoorLogs();
  };
  render(<DoorStateReport getLogs={getLogsPromise} />);
  expect(screen.getByRole('button', { name: /Retrieve Logs/i })).toBeTruthy();
  userEvent.click(screen.getByRole('button', { name: /Retrieve Logs/i }));
  expect(getLogsPromiseMock).toHaveBeenCalled();
});
