import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getFleetLogs } from '../utils.spec';
import { FleetStateReport } from './fleet-state-report';

const getLogsPromise = async () => await getFleetLogs();

it('smoke test', async () => {
  await waitFor(() => {
    render(<FleetStateReport getLogs={getLogsPromise} />);
  });
});

it('doesn`t shows the table when logs list is empty', async () => {
  await waitFor(() => {
    render(<FleetStateReport getLogs={async () => await []} />);
  });

  expect(screen.queryByText('Fleet State')).toBeFalsy();
});

it('calls the retrieve log function when the button is clicked', async () => {
  const getLogsPromiseMock = jasmine.createSpy();
  const getLogsPromise = async () => {
    getLogsPromiseMock();
    return await getFleetLogs();
  };
  render(<FleetStateReport getLogs={getLogsPromise} />);
  expect(screen.getByRole('button', { name: /Retrieve Logs/i })).toBeTruthy();
  userEvent.click(screen.getByRole('button', { name: /Retrieve Logs/i }));
  expect(getLogsPromiseMock).toHaveBeenCalled();
});
