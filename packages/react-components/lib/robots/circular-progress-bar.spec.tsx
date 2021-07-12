import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { CircularProgressBar } from './circular-progress-bar';

describe('Circular Progress Bar', () => {
  it('smoke test', () => {
    render(<CircularProgressBar progress={60} strokeColor="green" />);
    cleanup();
  });
});
