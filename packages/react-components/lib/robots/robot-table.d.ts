import { PaperProps } from '@material-ui/core';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { VerboseRobot } from './utils';
import { PaginationOptions } from '../tasks/task-table';
import { TaskProgress } from 'api-client';
export interface RobotTableProps extends PaperProps {
  /**
   * The current list of robots to display, when pagination is enabled, this should only
   * contain the robots for the current page.
   */
  tasks: TaskProgress[];
  robots: RmfModels.RobotState[];
  paginationOptions?: PaginationOptions;
  robotsWithTasks?: VerboseRobot[];
  onRefreshTasks?: (limt?: number, offset?: number, robotName?: string) => void;
  onRobotClickAndRefresh?(robot: VerboseRobot, ev?: React.MouseEvent<HTMLDivElement>): void;
}
export declare function RobotTable({
  tasks,
  robots,
  paginationOptions,
  robotsWithTasks,
  onRefreshTasks,
  onRobotClickAndRefresh,
  ...paperProps
}: RobotTableProps): JSX.Element;
