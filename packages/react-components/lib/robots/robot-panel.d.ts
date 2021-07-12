import React from 'react';
import * as RmfModels from 'rmf-models';
import { TaskProgress } from 'api-client';
export interface RobotPanelProps extends React.HTMLProps<HTMLDivElement> {
  robots: RmfModels.RobotState[];
  fetchTasks: (limit?: number, offset?: number, robotName?: string) => Promise<TaskProgress[]>;
}
export declare function RobotPanel({
  robots,
  fetchTasks,
  ...divProps
}: RobotPanelProps): JSX.Element;
