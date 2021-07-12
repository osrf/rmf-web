import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import NotFoundPage from './page-not-found';

describe('PageNotFound', () => {
  it('renders correctly', () => {
    const root = render(
      <BrowserRouter>
        <NotFoundPage routeLinkComponent={<Link to={'/test'}>Go to somewhere</Link>} />
      </BrowserRouter>,
    );
    expect(root.queryByAltText('404 Not Found')).toBeTruthy();
    expect(root.queryByText('Are you lost?')).toBeTruthy();
    root.unmount();
  });
});
