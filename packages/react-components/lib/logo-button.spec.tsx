import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { LogoButton } from './logo-button';

describe('Logo Button', () => {
  it('renders and is clickable', () => {
    const mockOnClick = jasmine.createSpy();
    render(
      <LogoButton logoPath="../stories/resources/roshealth-logo-white.png" onClick={mockOnClick} />,
    );
    expect(screen.getAllByRole('button').length).toBe(1);
    expect(screen.getByAltText('logo')).toBeTruthy();
    userEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
    cleanup();
  });

  it('renders and is disabled when no onClick prop is passed', () => {
    render(<LogoButton logoPath="../stories/resources/roshealth-logo-white.png" />);
    expect(screen.getByAltText('logo')).toBeTruthy();
    expect(screen.getByRole('button').classList.contains('Mui-disabled')).toBeTruthy();
    cleanup();
  });
});
