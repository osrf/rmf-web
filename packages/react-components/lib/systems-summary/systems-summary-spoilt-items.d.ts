/// <reference types="react" />
import * as RmfModels from 'rmf-models';
interface SpoiltItem {
  errorMessage?: string;
  name: string;
  state: string;
}
export interface SpoiltDoor extends SpoiltItem {
  door: RmfModels.Door;
}
export interface SpoiltLift extends SpoiltItem {
  lift: RmfModels.Lift;
}
export interface SpoiltDispenser extends SpoiltItem {
  dispenser: string;
}
export interface SpoiltRobot extends SpoiltItem {
  fleet: string;
  robot: RmfModels.RobotState;
}
export interface SystemSummarySpoiltItemsProps {
  doors: SpoiltDoor[];
  lifts: SpoiltLift[];
  dispensers: SpoiltDispenser[];
  robots: SpoiltRobot[];
  onClickSpoiltDoor?(door: RmfModels.Door): void;
  onClickSpoiltLift?(lift: RmfModels.Lift): void;
  onClickSpoiltRobot?(fleet: string, robot: RmfModels.RobotState): void;
  onClickSpoiltDispenser?(guid: string): void;
}
export declare const SystemSummarySpoiltItems: (
  props: SystemSummarySpoiltItemsProps,
) => JSX.Element;
export {};
