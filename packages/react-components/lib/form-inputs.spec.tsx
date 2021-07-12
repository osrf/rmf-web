import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PositiveIntField } from './form-inputs';

describe('PositiveIntField', () => {
  it('does not allow negative numbers to be typed', async () => {
    const root = render(<PositiveIntField id="test" label="test" />);
    const inputEl = root.getByLabelText('test') as HTMLInputElement;
    userEvent.clear(inputEl);
    userEvent.type(inputEl, '-1');
    // '-' char should get "eaten", so should end up with "1".
    expect(inputEl.value).toBe('1');
  });
});
