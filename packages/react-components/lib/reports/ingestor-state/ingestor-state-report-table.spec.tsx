import { cleanup, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import React from 'react';
import { getIngestorLogs } from '../utils.spec';
import { IngestorStateReportTable } from './ingestor-state-report-table';

const timestamp = new Date('Mon Jan  1 00:00:02 UTC 2001');

describe('Ingestor table test', () => {
  let root: RenderResult;
  let mockAddMoreRows: ReturnType<typeof jasmine.createSpy>;

  beforeEach(() => {
    mockAddMoreRows = jasmine.createSpy();
    root = render(
      <IngestorStateReportTable rows={getIngestorLogs()} addMoreRows={mockAddMoreRows} />,
    );
  });

  afterEach(cleanup);

  it('formats dates correctly', async () => {
    const tableFirstDateElement = (await root.getAllByTestId('ingestor-table-date'))[0];
    expect(tableFirstDateElement.innerHTML).toBe(format(timestamp, 'MMM dd yyyy hh:mm aaa'));
  });

  it('shows the correct number of rows', () => {
    const allRows = root.container.querySelectorAll('tr').length;
    // -3. from the tr of the table header, filter and pagination table
    expect(allRows - 3).toBe(100);
  });

  it('shows titles correctly', () => {
    expect(screen.queryByText('Guid')).toBeTruthy();
    expect(screen.queryByText('State')).toBeTruthy();
    expect(screen.queryByText('Timestamp')).toBeTruthy();
  });

  it('executes the addMoreRows', () => {
    const nextPageButton = screen.queryByTitle('Next Page')?.children[0];
    nextPageButton && userEvent.click(nextPageButton);
    expect(mockAddMoreRows).toHaveBeenCalled();
  });
});
