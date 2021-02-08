import React from 'react';
import {
  SystemSummaryItemState,
  SystemSummaryItemStateProps,
  SystemSummaryAlertProps,
  SystemSummaryAlert,
  SystemSummaryTaskState,
  SystemSummaryTaskStateProps,
  SystemSummaryBanner,
  SystemSummaryBannerProps,
  SystemSummarySpoiltItems,
  SystemSummarySpoiltItemsProps,
} from '../lib';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Main Menu Item State',
  component: SystemSummaryItemState,
} as Meta;

const itemStateDataDoor: SystemSummaryItemStateProps = {
  itemSummary: {
    item: 'Doors',
    summary: { operational: 1, outOfOrder: 1 },
    outOfOrder: [],
  },
  onClick: () => {
    /**filler */
  },
};

const itemStateDataRobot: SystemSummaryItemStateProps = {
  itemSummary: {
    item: 'Robots',
    summary: { operational: 2, outOfOrder: 0, idle: 1, charging: 1 },
    outOfOrder: [],
  },
  onClick: () => {
    /**filler */
  },
};

const systemSummaryAlert: SystemSummaryAlertProps = {
  notifications: [
    { id: 1, severity: 'High', time: 'January 29th 2021, 8:20:50', error: 'hello world' },
  ],
};

const systemSummaryTaskStateData: SystemSummaryTaskStateProps = {
  tasks: [
    {
      task_id: 'abc',
      state: 0,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    },
    {
      task_id: 'abc',
      state: 1,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    },
    {
      task_id: 'abc',
      state: 2,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    },
    {
      task_id: 'abc',
      state: 3,
      start_time: { sec: 0, nanosec: 0 },
      end_time: { sec: 0, nanosec: 0 },
      status: 'status',
      submission_time: { sec: 0, nanosec: 0 },
    },
  ],
};

const systemSummaryBannerData: SystemSummaryBannerProps = {
  bannerUrl: 'testUrl',
  isError: false,
};

const spoiltEquipment: SystemSummarySpoiltItemsProps = {
  spoiltItems: [
    { summary: 'lift1 - fire' },
    { summary: 'door1 - unknown' },
    { summary: 'robot1 - unknown' },
  ],
};

export const SystemSummaryItemStateStory: Story = (args) => (
  <React.Fragment>
    <SystemSummaryItemState
      itemSummary={itemStateDataDoor.itemSummary}
      onClick={itemStateDataDoor.onClick}
      {...args}
    />
    <SystemSummaryItemState
      itemSummary={itemStateDataRobot.itemSummary}
      onClick={itemStateDataRobot.onClick}
      {...args}
    />
  </React.Fragment>
);

export const SystemSummaryItemAlertStory: Story = (args) => (
  <React.Fragment>
    <SystemSummaryAlert notifications={systemSummaryAlert.notifications} {...args} />
    <SystemSummaryAlert notifications={[]} {...args} />
  </React.Fragment>
);

export const SystemSummaryTaskStateStory: Story = (args) => (
  <SystemSummaryTaskState tasks={systemSummaryTaskStateData.tasks} {...args} />
);

export const SystemSummaryBannerStory: Story = (args) => (
  <React.Fragment>
    <SystemSummaryBanner
      bannerUrl={systemSummaryBannerData.bannerUrl}
      isError={systemSummaryBannerData.isError}
      {...args}
    />
    <div style={{ margin: '1rem 0' }}></div>
    <SystemSummaryBanner
      bannerUrl={systemSummaryBannerData.bannerUrl}
      isError={!systemSummaryBannerData.isError}
      {...args}
    />
  </React.Fragment>
);

export const SystemSummarySpoiltItemStory: Story = (args) => (
  <SystemSummarySpoiltItems spoiltItems={spoiltEquipment.spoiltItems} {...args} />
);
