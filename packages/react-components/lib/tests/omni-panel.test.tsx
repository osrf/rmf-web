import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { OmniPanel, OmniPanelView } from '..';
import { OmniPanelProps } from '../omni-panel';

function TestPanel(props: Omit<OmniPanelProps, 'view' | 'children'>) {
  return (
    <OmniPanel view={0} {...props}>
      <OmniPanelView viewId={0}></OmniPanelView>
    </OmniPanel>
  );
}

test('triggers onBack callback', () => {
  const handler = jest.fn();
  const root = render(<TestPanel onBack={handler} />);
  fireEvent.click(root.getByTestId('back-button'));
  expect(handler).toHaveBeenCalled();
});

test('triggers onHome callback', () => {
  const handler = jest.fn();
  const root = render(<TestPanel onHome={handler} />);
  fireEvent.click(root.getByTestId('home-button'));
  expect(handler).toHaveBeenCalled();
});

test('triggers onClose callback', () => {
  const handler = jest.fn();
  const root = render(<TestPanel variant="backHomeClose" onClose={handler} />);
  fireEvent.click(root.getByTestId('close-button'));
  expect(handler).toHaveBeenCalled();
});

test('only render current view', () => {
  const root = render(
    <OmniPanel view={0}>
      <OmniPanelView viewId={0}>
        <div data-testid="0"></div>
      </OmniPanelView>
      <OmniPanelView viewId={1}>
        <div data-testid="1"></div>
      </OmniPanelView>
    </OmniPanel>,
  );

  expect(window.getComputedStyle(root.getByTestId('0')).visibility).toBe('visible');
  expect(window.getComputedStyle(root.getByTestId('1')).visibility).toBe('hidden');
});
