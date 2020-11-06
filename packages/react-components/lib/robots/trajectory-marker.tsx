import Debug from 'debug';
import React from 'react';
import { Trajectory, trajectoryPath } from './trajectory';
import { FillAnimationPath, FollowAnimationPath, NoAnimationPath } from './trajectory-paths';

const debug = Debug('Robots:TrajectoryMarker');

export type Conflict = number[];

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
  loopAnimations?: boolean;
}

export const TrajectoryMarker = React.memo(
  React.forwardRef((props: TrajectoryMarkerProps, ref: React.Ref<SVGGElement>) => {
    const {
      trajectory,
      conflict,
      color,
      variant = 'follow',
      loopAnimations = false,
      ...otherProps
    } = props;
    debug(`render ${trajectory.id}`);
    const footprint = trajectory.dimensions;

    const pathD = React.useMemo(() => {
      return trajectoryPath(trajectory.segments).d;
    }, [trajectory]);

    const PathComponent = React.useMemo(() => {
      switch (variant) {
        case 'plain':
          return NoAnimationPath;
        case 'follow':
          return FollowAnimationPath;
        case 'fill':
          return FillAnimationPath;
        default:
          return NoAnimationPath;
      }
    }, [variant]);

    return (
      <g ref={ref} {...otherProps}>
        <PathComponent
          trajectory={trajectory}
          d={pathD}
          color={color}
          footprint={footprint}
          conflict={conflict}
          loop={loopAnimations}
        />
      </g>
    );
  }),
);

export default TrajectoryMarker;
