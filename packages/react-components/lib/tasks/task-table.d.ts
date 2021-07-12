import { PaperProps, TablePagination } from '@material-ui/core';
import React from 'react';
import * as RmfModels from 'rmf-models';
export declare type PaginationOptions = Omit<
  React.ComponentPropsWithoutRef<typeof TablePagination>,
  'component'
>;
export interface TaskTableProps extends PaperProps {
  /**
   * The current list of tasks to display, when pagination is enabled, this should only
   * contain the tasks for the current page.
   */
  tasks: RmfModels.TaskSummary[];
  paginationOptions?: PaginationOptions;
  onCreateTaskClick?: React.MouseEventHandler<HTMLButtonElement>;
  onTaskClick?(ev: React.MouseEvent<HTMLDivElement>, task: RmfModels.TaskSummary): void;
  onRefreshClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare function TaskTable({
  tasks,
  paginationOptions,
  onCreateTaskClick,
  onTaskClick,
  onRefreshClick,
  ...paperProps
}: TaskTableProps): JSX.Element;
