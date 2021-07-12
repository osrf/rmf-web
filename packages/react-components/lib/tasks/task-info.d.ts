import React from 'react';
import * as RmfModels from 'rmf-models';
export interface TaskInfoProps {
  task: RmfModels.TaskSummary;
  onCancelTaskClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare function TaskInfo({ task, onCancelTaskClick }: TaskInfoProps): JSX.Element;
