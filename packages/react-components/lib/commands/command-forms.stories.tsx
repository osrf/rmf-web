import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DeliveryRequestForm } from './delivery-request-form';
import { LoopRequestForm } from './loop-request-form';
import { availableDispensers, availablePlaces, fleets } from './test-data.spec';

export default {
  title: 'Command Forms',
  argTypes: {
    doLoopRequest: { action: 'loop request' },
    doDeliveryRequest: { action: 'delivery request' },
  },
} as Meta;

export const DeliveryRequest: Story = (args) => (
  <DeliveryRequestForm
    fleetNames={fleets}
    availablePlaces={availablePlaces}
    availableDispensers={availableDispensers}
    {...args}
  />
);

export const LoopRequest: Story = (args) => (
  <LoopRequestForm fleetNames={fleets} availablePlaces={availablePlaces} {...args} />
);
