import { render } from '@testing-library/react';
import React from 'react';
import { RobotTable } from './robot-table';
import { makeRandomRobot } from './test-utils.spec';

describe('RobotTable', () => {
  it('shows all robots', () => {
    const robots = [
      makeRandomRobot('test_robot1', 'test_fleet', 2),
      makeRandomRobot('test_robot2', 'test_fleet', 1),
    ];
    const root = render(<RobotTable robots={robots} />);
    expect(root.getByText('test_robot1')).toBeTruthy();
    expect(root.getByText('test_robot2')).toBeTruthy();
  });

  it('smoke test for different robot states', () => {
    const idleRobot = makeRandomRobot('test_robot1', 'test_fleet', 0);
    const chargingRobot = makeRandomRobot('test_robot2', 'test_fleet', 1);
    const movingRobot = makeRandomRobot('test_robot3', 'test_fleet', 2);
    const pausedRobot = makeRandomRobot('test_robot4', 'test_fleet', 3);
    const waitingRobot = makeRandomRobot('test_robot5', 'test_fleet', 4);
    const emergencyRobot = makeRandomRobot('test_robot6', 'test_fleet', 5);
    const goingHomeRobot = makeRandomRobot('test_robot7', 'test_fleet', 6);
    const dockingRobot = makeRandomRobot('test_robot8', 'test_fleet', 7);
    const errorRobot = makeRandomRobot('test_robot19', 'test_fleet', 8);

    const robots = [
      idleRobot,
      chargingRobot,
      movingRobot,
      pausedRobot,
      waitingRobot,
      emergencyRobot,
      goingHomeRobot,
      dockingRobot,
      errorRobot,
    ];
    render(<RobotTable robots={robots} />);
  });

  it('pagination is shown when pagination option is provided', () => {
    const spy = jasmine.createSpy();
    const root = render(
      <RobotTable
        robots={[makeRandomRobot('test_robot1', 'test_fleet', 2)]}
        paginationOptions={{
          count: 1,
          page: 0,
          rowsPerPage: 10,
          rowsPerPageOptions: [10],
          onChangePage: spy,
        }}
      />,
    );
    expect(root.getByText('1-1 of 1')).toBeTruthy();
  });

  it('pagination is not shown when no pagination option is provided', () => {
    const root = render(<RobotTable robots={[makeRandomRobot('test_robot1', 'test_fleet', 2)]} />);
    expect(root.queryByText('1-1 of 1')).toBeNull();
  });
});
