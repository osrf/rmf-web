import React from 'react';
import * as RmfModels from 'rmf-models';
interface TaskSummaryAccordionInfoProps {
  task: RmfModels.TaskSummary;
}
export declare const TaskSummaryAccordionInfo: (
  props: TaskSummaryAccordionInfoProps,
) => JSX.Element;
export interface TaskSummaryAccordionProps {
  tasks: RmfModels.TaskSummary[];
}
export declare const TaskSummaryAccordion: React.MemoExoticComponent<
  (props: TaskSummaryAccordionProps) => JSX.Element
>;
export default TaskSummaryAccordion;
