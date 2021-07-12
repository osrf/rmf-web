import { Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  CircularProgressBar as CircularProgressBar_,
  CircularProgressBarProps,
} from './circular-progress-bar';

export default {
  title: 'Robots/Circular Progress Bar',
  component: CircularProgressBar_,
} as Meta;

export const CircularProgressBar: Story<CircularProgressBarProps> = (args) => {
  return (
    <>
      <CircularProgressBar_ {...args}>
        <Typography variant="h6">{args.progress}%</Typography>
      </CircularProgressBar_>
    </>
  );
};

CircularProgressBar.args = {
  progress: 70,
  strokeColor: 'green',
};
