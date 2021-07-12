/// <reference types="react" />
import { Trajectory } from './trajectory';
export interface TrajectoryPathProps {
  trajectory: Trajectory;
  d: string;
  color: string;
  conflict: boolean;
  footprint: number;
  /**
   * default: 1
   */
  animationScale?: number;
  /**
   * default: false
   */
  animationLoop?: boolean;
}
export declare const NoAnimationPath: (props: TrajectoryPathProps) => JSX.Element;
export declare const FollowAnimationPath: (props: TrajectoryPathProps) => JSX.Element;
export declare const FillAnimationPath: (props: TrajectoryPathProps) => JSX.Element;
