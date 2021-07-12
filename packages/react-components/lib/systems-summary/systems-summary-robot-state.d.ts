/// <reference types="react" />
import { SpoiltRobot } from './index';
export interface RobotSummary {
  operational: number;
  idle: number;
  charging: number;
  spoiltRobots: SpoiltRobot[];
}
export interface RobotSummaryStateProps {
  item: string;
  robotSummary: RobotSummary;
  onClick?: () => void;
}
export declare const RobotSummaryState: (props: RobotSummaryStateProps) => JSX.Element;
