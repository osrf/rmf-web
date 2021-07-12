import { Meta, Story } from '@storybook/react';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { DispenserAccordion } from './dispenser-accordion';

export default {
  title: 'Dispenser Accordion',
  component: DispenserAccordion,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

const baseDispenser: RmfModels.DispenserState = {
  guid: 'test',
  mode: RmfModels.DispenserState.IDLE,
  request_guid_queue: [],
  seconds_remaining: 0,
  time: { sec: 0, nanosec: 0 },
};

export const Basic: Story = (args) => (
  <DispenserAccordion dispenser={'dispenser'} dispenserState={baseDispenser} {...args} />
);
