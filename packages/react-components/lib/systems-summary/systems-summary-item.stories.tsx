import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ItemSummary, SystemSummaryItemState } from './systems-summary-item-state';
import { RobotSummary, RobotSummaryState } from './systems-summary-robot-state';

export default {
  title: 'Systems summary item',
  component: SystemSummaryItemState,
} as Meta;

const itemSummary: ItemSummary = {
  operational: 0,
  spoiltItem: [],
};

const robotSummary: RobotSummary = {
  operational: 0,
  idle: 0,
  charging: 0,
  spoiltRobots: [],
};

export const SystemSummaryItemStateStory: Story = (args) => (
  <React.Fragment>
    <SystemSummaryItemState
      item={'Door'}
      itemSummary={itemSummary}
      onClick={() => {
        /**filler */
      }}
      {...args}
    />
    <RobotSummaryState
      item={'Robots'}
      robotSummary={robotSummary}
      onClick={() => {
        /**filler */
      }}
      {...args}
    />
  </React.Fragment>
);
