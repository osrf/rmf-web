import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SystemSummarySpoiltItems } from './systems-summary-spoilt-items';
import { door, fleet, lift } from './test.utils.spec';

it('should render the lists of different spoilt items', () => {
  render(
    <SystemSummarySpoiltItems
      doors={[
        {
          name: 'door',
          state: 'state',
          door: door,
        },
      ]}
      lifts={[
        {
          name: 'lift',
          state: 'state',
          lift: lift,
        },
      ]}
      robots={[]}
      dispensers={[]}
    />,
  );

  expect(screen.getAllByText('door - state').length).toEqual(1);
  expect(screen.getAllByText('lift - state').length).toEqual(1);
});

it('it should trigger the spoilt item callback function when spoit item is clicked', () => {
  const doorClick = jasmine.createSpy();
  const liftClick = jasmine.createSpy();
  const dispenserClick = jasmine.createSpy();
  const robotClick = jasmine.createSpy();

  render(
    <SystemSummarySpoiltItems
      doors={[
        {
          name: 'door',
          state: 'state',
          door: door,
        },
      ]}
      lifts={[
        {
          name: 'lift',
          state: 'state',
          lift: lift,
        },
      ]}
      dispensers={[
        {
          name: 'dispenser',
          state: 'state',
          dispenser: 'dispenser',
        },
      ]}
      robots={[
        {
          name: 'robot',
          state: 'state',
          robot: fleet.robots[0],
          fleet: fleet.name,
        },
      ]}
      onClickSpoiltDoor={doorClick}
      onClickSpoiltLift={liftClick}
      onClickSpoiltDispenser={dispenserClick}
      onClickSpoiltRobot={robotClick}
    />,
  );

  userEvent.click(screen.getByText('door - state'));
  userEvent.click(screen.getByText('lift - state'));
  userEvent.click(screen.getByText('dispenser - state'));
  userEvent.click(screen.getByText('robot - state'));

  expect(doorClick).toHaveBeenCalled();
  expect(liftClick).toHaveBeenCalled();
  expect(dispenserClick).toHaveBeenCalled();
  expect(robotClick).toHaveBeenCalled();
});
