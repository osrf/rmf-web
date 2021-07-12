import React from 'react';
import * as RmfModels from 'rmf-models';
import { CreateTaskFormProps } from './create-task';
export interface FetchTasksResult {
  tasks: RmfModels.TaskSummary[];
  totalCount: number;
}
export interface TaskPanelProps extends React.HTMLProps<HTMLDivElement> {
  fetchTasks: (limit: number, offset: number) => Promise<FetchTasksResult>;
  cleaningZones?: string[];
  loopWaypoints?: string[];
  deliveryWaypoints?: string[];
  dispensers?: string[];
  ingestors?: string[];
  submitTasks?: CreateTaskFormProps['submitTasks'];
  cancelTask?: (task: RmfModels.TaskSummary) => Promise<void>;
}
export declare function TaskPanel({
  fetchTasks,
  cleaningZones,
  loopWaypoints,
  deliveryWaypoints,
  dispensers,
  ingestors,
  submitTasks,
  cancelTask,
  ...divProps
}: TaskPanelProps): JSX.Element;
