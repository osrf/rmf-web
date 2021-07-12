/// <reference types="react" />
import * as RmfModels from 'rmf-models';
export interface SystemSummaryTaskStateProps {
  tasks: RmfModels.TaskSummary[];
  onClick?: () => void;
}
export interface TaskSummaryState {
  active: number;
  finish: number;
  failed: number;
  queued: number;
}
export declare const SystemSummaryTaskState: (props: SystemSummaryTaskStateProps) => JSX.Element;
