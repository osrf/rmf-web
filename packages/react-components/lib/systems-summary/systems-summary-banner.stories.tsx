import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SystemSummaryBanner, SystemSummaryBannerProps } from './systems-summary-banner';

export default {
  title: 'Systems summary banner',
  component: SystemSummaryBanner,
} as Meta;

const systemSummaryBannerData: SystemSummaryBannerProps = {
  isError: false,
};

export const SystemSummaryBannerStory: Story = (args) => (
  <React.Fragment>
    <SystemSummaryBanner
      isError={systemSummaryBannerData.isError}
      imageSrc={'link-to-avatar'}
      {...args}
    />
    <div style={{ margin: '1rem 0' }}></div>
    <SystemSummaryBanner isError={!systemSummaryBannerData.isError} {...args} />
  </React.Fragment>
);
