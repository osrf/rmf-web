import * as RmfModels from 'rmf-models';
export declare const getActorFromStatus: (status: string) => RegExpMatchArray | null;
export declare const formatStatus: (status: string) => string[];
export declare const getStateLabel: (state: number) => string;
export declare const sortTasksBySubmissionTime: (
  tasks: RmfModels.TaskSummary[],
) => RmfModels.TaskSummary[];
/**
 * Classifies and stores each task by its state.
 */
export declare const separateTasksByState: (
  tasks: Record<string, RmfModels.TaskSummary>,
  states: string[],
) => Record<string, RmfModels.TaskSummary[]>;
/**
 * Sort tasks by state and by submission time, so what is active is always at the top of the list.
 */
export declare const sortTasks: (
  tasks: Record<string, RmfModels.TaskSummary>,
) => RmfModels.TaskSummary[];
