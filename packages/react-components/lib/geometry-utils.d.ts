export declare function radiansToDegrees(radians: number): number;
/**
 * Transform coords on the middle of a SVG's Rect to top left coords.
 */
export declare function transformMiddleCoordsOfRectToSVGBeginPoint(
  x: number,
  y: number,
  width: number,
  depth: number,
): [number, number];
/**
 * Converts a svg coordinate to RMF.
 * @param pos
 */
export declare function toRmfCoords(pos: [number, number]): [number, number];
/**
 * Converts a RMF coordinate to SVG
 * @param pos
 */
export declare function fromRmfCoords(pos: [number, number]): [number, number];
/**
 * Converts a SVG rotation (in radians) to RMF yaw (in radians)
 * @param yaw
 */
export declare function toRmfYaw(yaw: number): number;
/**
 * Converts a RMF yaw angle (in radians) to svg (in radians)
 * @param yaw
 */
export declare function fromRmfYaw(yaw: number): number;
export interface Pose2D {
  x: number;
  y: number;
  theta: number;
}
export interface Segment {
  initialPose: number;
  finalPose: number;
  initialVelocity: number;
  finalVelocity: number;
  initialTime: number;
  finalTime: number;
}
export interface CoefficientSet {
  a: number;
  b: number;
  c: number;
  d: number;
}
export interface Velocity {
  x: number;
  y: number;
  theta: number;
}
export interface Knot {
  pose: Pose2D;
  velocity: Velocity;
  time: number;
}
export interface SegmentCoefficients {
  x: CoefficientSet;
  y: CoefficientSet;
  theta: CoefficientSet;
  initialTime: number;
  finalTime: number;
}
export declare function segmentToCoefficientSet(segment: Segment): CoefficientSet;
export declare function assignKnotsToSegment(
  knot: Knot,
  nextKnot: Knot,
  forCoordinate: keyof Pose2D,
): Segment;
export declare function knotsToSegmentCoefficientsArray(knots: Knot[]): SegmentCoefficients[];
export declare function getInterpolatedTime(
  initialTime: number,
  finalTime: number,
  time: number,
): number;
export declare function resolveSpline(
  coefficientSet: CoefficientSet,
  interpolatedTime: number,
  interpolatedTimePow2?: number,
  interpolatedTimePow3?: number,
): number;
export declare function getPositionFromSegmentCoefficientsArray(
  time: number,
  scs: SegmentCoefficients[],
): Pose2D | null;
export declare function bezierControlPoints(segmentCoefficients: SegmentCoefficients): number[][];
