import { useTheme } from '@material-ui/core';
import React from 'react';
import { Trajectory } from './trajectory';

function keyframeOffsets(traj: Trajectory): number[] {
  const { segments } = traj;
  const totalDuration = segments[segments.length - 1].t - segments[0].t;
  return traj.segments.map((seg) => (seg.t - segments[0].t) / totalDuration);
}

function animationDuration(traj: Trajectory, scale: number): number {
  return (traj.segments[traj.segments.length - 1].t - traj.segments[0].t) / scale;
}

interface ConflictPathProps {
  d: string;
  trajectory: Trajectory;
  footprint: number;
}

const ConflictPath = (props: ConflictPathProps) => {
  const { d, trajectory, footprint } = props;
  const theme = useTheme();

  return (
    <>
      <mask id={`mask-${trajectory.id}`} maskUnits="userSpaceOnUse">
        <path d={d} stroke={'white'} strokeWidth={footprint} strokeLinecap="round" fill={'none'} />
        <path
          d={d}
          stroke={'black'}
          strokeWidth={footprint * 0.8}
          strokeLinecap="round"
          fill={'none'}
        />
      </mask>
      <path
        d={d}
        stroke={theme.palette.error.main}
        strokeWidth={footprint}
        strokeLinecap="round"
        fill={'none'}
        mask={`url(#mask-${trajectory.id})`}
      />
    </>
  );
};

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

export const NoAnimationPath = (props: TrajectoryPathProps): JSX.Element => {
  const { trajectory, d, color, conflict, footprint } = props;
  return (
    <>
      <path
        d={d}
        stroke={color}
        opacity={0.8}
        strokeWidth={conflict ? footprint * 0.8 : footprint}
        strokeLinecap="round"
        fill={'none'}
      />
      {conflict ? <ConflictPath d={d} trajectory={trajectory} footprint={footprint} /> : null}
    </>
  );
};

export const FollowAnimationPath = (props: TrajectoryPathProps): JSX.Element => {
  const {
    trajectory,
    d,
    color,
    conflict,
    footprint,
    animationScale = 1,
    animationLoop = false,
  } = props;
  const pathRef = React.useRef<SVGPathElement>(null);

  React.useLayoutEffect(() => {
    if (!pathRef.current) {
      return;
    }

    const offsets = keyframeOffsets(trajectory);
    const pathAnim = pathRef.current;

    // Idle robots still have a trajectory with a path length of 0. This prevents a divide
    // by 0 error.
    const totalLength = pathAnim.getTotalLength();
    if (totalLength < 0.01) {
      return;
    }

    const strokeWidth = Number(pathAnim.getAttribute('stroke-width') || 1);
    const strokeDash = strokeWidth / totalLength;
    pathAnim.setAttribute('stroke-dasharray', `${strokeDash} ${2 - strokeDash}`);

    pathAnim.animate(
      offsets.map((offset) => ({
        offset: offset,
        strokeDashoffset: Math.max(2 - offset, strokeDash + 1),
      })),
      {
        duration: animationDuration(trajectory, animationScale),
        easing: 'linear',
        fill: 'forwards',
        iterations: animationLoop ? Infinity : 1,
      },
    );

    return () => {
      pathAnim.getAnimations().forEach((anim) => anim.cancel());
    };
  }, [animationScale, animationLoop, trajectory]);

  return (
    <>
      <path
        d={d}
        stroke={color}
        opacity={0.4}
        strokeWidth={conflict ? footprint * 0.8 : footprint}
        strokeLinecap="round"
        fill={'none'}
      />
      <path
        ref={pathRef}
        d={d}
        stroke={color}
        opacity={0.8}
        strokeWidth={conflict ? footprint * 0.8 : footprint}
        strokeLinecap="round"
        fill={'none'}
        pathLength={1}
        strokeDasharray={2}
        strokeDashoffset={2}
      />
      {conflict ? <ConflictPath d={d} trajectory={trajectory} footprint={footprint} /> : null}
    </>
  );
};

export const FillAnimationPath = (props: TrajectoryPathProps): JSX.Element => {
  const {
    trajectory,
    d,
    color,
    conflict,
    footprint,
    animationScale = 1,
    animationLoop = false,
  } = props;
  const pathRef = React.useRef<SVGPathElement>(null);

  React.useLayoutEffect(() => {
    if (!pathRef.current) {
      return;
    }

    const offsets = keyframeOffsets(trajectory);
    const pathAnim = pathRef.current;

    pathAnim.animate(
      offsets.map((offset) => ({
        offset: offset,
        strokeDashoffset: 2 - offset,
      })),
      {
        duration: animationDuration(trajectory, animationScale),
        easing: 'linear',
        fill: 'forwards',
        iterations: animationLoop ? Infinity : 1,
      },
    );

    return () => {
      pathAnim.getAnimations().forEach((anim) => anim.cancel());
    };
  }, [trajectory, animationScale, animationLoop]);

  return (
    <>
      <path
        d={d}
        stroke={color}
        opacity={0.4}
        strokeWidth={conflict ? footprint * 0.8 : footprint}
        strokeLinecap="round"
        fill={'none'}
      />
      <path
        ref={pathRef}
        d={d}
        stroke={color}
        opacity={0.8}
        strokeWidth={conflict ? footprint * 0.8 : footprint}
        strokeLinecap="round"
        fill={'none'}
        pathLength={1}
        strokeDasharray={2}
        strokeDashoffset={2}
      />
      {conflict ? <ConflictPath d={d} trajectory={trajectory} footprint={footprint} /> : null}
    </>
  );
};
