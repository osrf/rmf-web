import { render } from '@testing-library/react';
import React from 'react';
import Unauthorized from './unauthorized';

describe('Unauthorized', () => {
  it('renders correctly', () => {
    const root = render(<Unauthorized />);
    expect(root.queryByText('Unauthorized')).toBeTruthy();
    root.unmount();
  });
});
