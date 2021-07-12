import React from 'react';
import { Trajectory } from './trajectory';
export declare type Conflict = number[];
export interface TrajectoryMarkerProps {
  trajectory: Trajectory;
  conflict: boolean;
  color: string;
  /**
   * default: follow
   */
  variant?: 'follow' | 'fill' | 'plain';
  /**
   * default: false
   */
  animationLoop?: boolean;
  /**
   * default: 1
   */
  animationScale?: number;
}
export declare const TrajectoryMarker: React.ForwardRefExoticComponent<
  TrajectoryMarkerProps & React.RefAttributes<SVGGElement>
>;
export default TrajectoryMarker;
