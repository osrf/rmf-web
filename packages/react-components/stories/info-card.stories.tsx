import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SimpleInfo } from '../lib';

export default {
  title: 'Simple Info',
  argTypes: {
    stringDisplayName: {
      name: 'String Display Name',
    },
    stringValue: {
      name: 'String Value',
    },
    numberDisplayName: {
      name: 'Number Display Name',
    },
    numberValue: {
      name: 'Number Value',
    },
  },
} as Meta;

export const SimpleData: Story = ({
  stringDisplayName,
  stringValue,
  numberDisplayName,
  numberValue,
  ...args
}) => {
  return (
    <SimpleInfo
      data={[
        { name: stringDisplayName, value: stringValue },
        { name: numberDisplayName, value: numberValue },
      ]}
      {...args}
    />
  );
};
SimpleData.args = {
  stringDisplayName: 'string',
  stringValue: 'value',
  numberDisplayName: 'number',
  numberValue: 0,
};

export const Array: Story = (args) => {
  return <SimpleInfo data={[{ name: 'strings', value: ['hello', 'world'] }]} {...args} />;
};
