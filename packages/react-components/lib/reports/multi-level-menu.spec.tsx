import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ExpandableMultilevelMenuProps, MultiLevelMenu } from './multi-level-menu';

describe('Multi level menu', () => {
  let buildMenuStructure: ExpandableMultilevelMenuProps[];
  let mockClickAllLogs: ReturnType<typeof jasmine.createSpy>;
  let mockClickRobotStates: ReturnType<typeof jasmine.createSpy>;

  beforeEach(() => {
    mockClickAllLogs = jasmine.createSpy();
    mockClickRobotStates = jasmine.createSpy();

    const buildReportMenuStructure = (): ExpandableMultilevelMenuProps[] => {
      return [
        {
          icon: <h1>Mock Icon 1</h1>,
          title: 'All logs',
          items: [],
          onClick: mockClickAllLogs,
        },
        {
          icon: <h1>Mock Icon 2</h1>,
          title: 'Robots',
          items: [
            {
              title: 'Robot states',
              items: [],
              onClick: mockClickRobotStates,
            },
          ],
        },
      ] as ExpandableMultilevelMenuProps[];
    };
    buildMenuStructure = buildReportMenuStructure();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly with `All logs` and `Robots` titles on the first level', () => {
    render(<MultiLevelMenu menuStructure={buildMenuStructure}></MultiLevelMenu>);
    expect(screen.getByText('Mock Icon 1')).toBeTruthy();
    expect(screen.getByText('All logs')).toBeTruthy();

    expect(screen.getByText('Mock Icon 2')).toBeTruthy();
    expect(screen.getByText('Robots')).toBeTruthy();

    expect(screen.queryByText('Robot states')).toBeFalsy();
  });

  it('triggers an action, if defined, when clicking on a title ', () => {
    render(<MultiLevelMenu menuStructure={buildMenuStructure}></MultiLevelMenu>);
    userEvent.click(screen.getByText('All logs'));
    expect(mockClickAllLogs).toHaveBeenCalledTimes(1);
  });

  it('shows the child level after clicking the parent level', () => {
    render(<MultiLevelMenu menuStructure={buildMenuStructure}></MultiLevelMenu>);
    userEvent.click(screen.getByText('Robots'));
    expect(screen.getByText('Robot states')).toBeTruthy();
  });

  it('triggers an action, if defined, after clicking on a child level title', () => {
    render(<MultiLevelMenu menuStructure={buildMenuStructure}></MultiLevelMenu>);
    userEvent.click(screen.getByText('Robots'));
    userEvent.click(screen.getByText('Robot states'));
    expect(mockClickRobotStates).toHaveBeenCalledTimes(1);
  });

  it('shows the parent level and the child level titles simultaneously', () => {
    render(<MultiLevelMenu menuStructure={buildMenuStructure}></MultiLevelMenu>);
    userEvent.click(screen.getByText('Robots'));
    screen.getByText('Robot states');
    expect(screen.getByText('Robots')).toBeTruthy();
    expect(screen.getByText('Robot states')).toBeTruthy();
  });
});
