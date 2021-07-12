import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getDispenserLogs } from '../utils.spec';
import { DispenserStateReport } from './dispenser-state-report';

const getLogsPromise = async () => await getDispenserLogs();

it('smoke test', async () => {
  await waitFor(() => {
    render(<DispenserStateReport getLogs={getLogsPromise} />);
  });
});

it('doesn`t shows the table when logs list is empty', async () => {
  await waitFor(() => {
    render(<DispenserStateReport getLogs={async () => await []} />);
  });

  expect(screen.queryByText('Dispenser State')).toBeFalsy();
});

it('calls the retrieve log function when the button is clicked', async () => {
  const getLogsPromiseMock = jasmine.createSpy();
  const getLogsPromise = async () => {
    getLogsPromiseMock();
    return await getDispenserLogs();
  };
  render(<DispenserStateReport getLogs={getLogsPromise} />);
  expect(screen.getByRole('button', { name: /Retrieve Logs/i })).toBeTruthy();
  userEvent.click(screen.getByRole('button', { name: /Retrieve Logs/i }));
  expect(getLogsPromiseMock).toHaveBeenCalled();
});
