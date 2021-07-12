import { Tab } from '@material-ui/core';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { NavigationBar } from './navigation-bar';

describe('Banner Tab', () => {
  it('renders correctly', () => {
    const mockOnTabChange = jasmine.createSpy();
    render(
      <NavigationBar onTabChange={mockOnTabChange} value={'building'}>
        <Tab
          key={'building-tab'}
          label={'Building'}
          value={'building'}
          aria-label={`building-tab`}
        />
        <Tab key={'robots'} label={'Robots'} value={'robots'} aria-label={`building-tab`} />
      </NavigationBar>,
    );
    expect(screen.getByText('Building')).toBeTruthy();
    cleanup();
  });
});
