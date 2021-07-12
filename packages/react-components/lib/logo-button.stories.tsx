import Typography from '@material-ui/core/Typography';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LogoButton } from './logo-button';

export default {
  title: 'Logo Button',
  component: LogoButton,
} as Meta;

export const ClickEnabledLogoButton: Story = () => {
  return (
    <>
      <Typography variant="h6">Click the button below</Typography>
      <LogoButton
        logoPath="/assets/roshealth-logo-white.png"
        onClick={() => alert('hello world')}
      />
    </>
  );
};

export const DisabledLogoButton: Story = () => {
  return (
    <>
      <Typography variant="h6">This button is disabled</Typography>
      <LogoButton logoPath="/assets/roshealth-logo-white.png" />
    </>
  );
};
