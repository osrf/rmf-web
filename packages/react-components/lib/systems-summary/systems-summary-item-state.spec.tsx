import { render } from '@testing-library/react';
import React from 'react';
import { SystemSummaryItemState } from './systems-summary-item-state';
import { itemSummary } from './test.utils.spec';

it('smoke test', () => {
  render(
    <SystemSummaryItemState
      item={'door'}
      itemSummary={itemSummary}
      onClick={jasmine.createSpy()}
    />,
  );
});
