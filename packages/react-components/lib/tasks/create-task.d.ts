import { DialogProps } from '@material-ui/core';
import type { SubmitTask } from 'api-client';
import React from 'react';
export interface CreateTaskFormProps extends DialogProps {
  /**
   * Shows extra UI elements suitable for submittng batched tasks. Default to 'false'.
   */
  allowBatch?: boolean;
  cleaningZones?: string[];
  loopWaypoints?: string[];
  deliveryWaypoints?: string[];
  dispensers?: string[];
  ingestors?: string[];
  submitTasks?(tasks: SubmitTask[]): Promise<void>;
  tasksFromFile?(): Promise<SubmitTask[]> | SubmitTask[];
  onSuccess?(tasks: SubmitTask[]): void;
  onFail?(error: Error, tasks: SubmitTask[]): void;
  onCancelClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare function CreateTaskForm({
  cleaningZones,
  loopWaypoints,
  deliveryWaypoints,
  dispensers,
  ingestors,
  submitTasks,
  tasksFromFile,
  onSuccess,
  onFail,
  onCancelClick,
  ...dialogProps
}: CreateTaskFormProps): JSX.Element;
