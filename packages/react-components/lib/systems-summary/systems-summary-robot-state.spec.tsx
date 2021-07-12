import { render } from '@testing-library/react';
import React from 'react';
import { RobotSummaryState } from './systems-summary-robot-state';
import { robotSummary } from './test.utils.spec';

it('smoke test', () => {
  render(
    <RobotSummaryState item={'robot'} robotSummary={robotSummary} onClick={jasmine.createSpy()} />,
  );
});
