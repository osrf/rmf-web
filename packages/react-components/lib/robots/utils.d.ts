import { TaskProgress } from 'api-client';
import * as RmfModels from 'rmf-models';
/**
 * Returns a uniquely identifiable string representing a robot.
 */
export declare function robotHash(name: string, fleet: string): string;
export declare function robotModeToString(robotMode: RmfModels.RobotMode): string;
export interface VerboseRobot extends RmfModels.RobotState {
  assignedTasks: TaskProgress[];
}
export declare function makeVerboseRobot(
  robot: RmfModels.RobotState,
  assignedTasks: TaskProgress[],
): VerboseRobot;
export declare function allocateTasksToRobots(
  robots: RmfModels.RobotState[],
  tasks: TaskProgress[],
): VerboseRobot[];
