import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CreateTaskForm, CreateTaskFormProps } from '../../lib';

export default {
  title: 'Tasks/Create Task',
  component: CreateTaskForm,
} as Meta;

export const CreateTask: Story<CreateTaskFormProps> = (args) => {
  return <CreateTaskForm {...args}></CreateTaskForm>;
};
