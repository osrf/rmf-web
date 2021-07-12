import { LinearProgressProps } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LinearProgressBar as LinearProgressBar_ } from './linear-progress-bar';

export default {
  title: 'Robots/Linear Progress Bar',
  component: LinearProgressBar_,
} as Meta;

export const LinearProgressBar: Story<LinearProgressProps & { value: number }> = (args) => {
  return <LinearProgressBar_ {...args} />;
};

LinearProgressBar.args = {
  value: 100,
};
