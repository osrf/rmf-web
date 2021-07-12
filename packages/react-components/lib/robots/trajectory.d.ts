export declare type RawVelocity = [number, number, number];
export declare type RawPose2D = [number, number, number];
export interface RawKnot {
  t: number;
  v: RawVelocity;
  x: RawPose2D;
}
export interface Trajectory {
  id: number;
  shape: string;
  dimensions: number;
  segments: RawKnot[];
  robot_name: string;
  fleet_name: string;
  map_name: string;
}
export interface TrajectoryPath {
  d: string;
  segOffsets: number[];
}
export declare function trajectoryPath(trajectorySegments: RawKnot[]): TrajectoryPath;
