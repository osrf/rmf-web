import type { SubmitTask } from 'api-client';
export declare function taskStateToStr(state: number): string;
export declare function taskTypeToStr(taskType: number): string;
export declare function parseTasksFile(contents: string): SubmitTask[];
