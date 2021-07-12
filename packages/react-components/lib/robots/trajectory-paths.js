import { useTheme } from '@material-ui/core';
import React from 'react';
function keyframeOffsets(traj) {
  var segments = traj.segments;
  var totalDuration = segments[segments.length - 1].t - segments[0].t;
  return traj.segments.map(function (seg) {
    return (seg.t - segments[0].t) / totalDuration;
  });
}
function animationDuration(traj, scale) {
  return (traj.segments[traj.segments.length - 1].t - traj.segments[0].t) / scale;
}
var ConflictPath = function (props) {
  var d = props.d,
    trajectory = props.trajectory,
    footprint = props.footprint;
  var theme = useTheme();
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'mask',
      { id: 'mask-' + trajectory.id, maskUnits: 'userSpaceOnUse' },
      React.createElement('path', {
        d: d,
        stroke: 'white',
        strokeWidth: footprint,
        strokeLinecap: 'round',
        fill: 'none',
      }),
      React.createElement('path', {
        d: d,
        stroke: 'black',
        strokeWidth: footprint * 0.8,
        strokeLinecap: 'round',
        fill: 'none',
      }),
    ),
    React.createElement('path', {
      d: d,
      stroke: theme.palette.error.main,
      strokeWidth: footprint,
      strokeLinecap: 'round',
      fill: 'none',
      mask: 'url(#mask-' + trajectory.id + ')',
    }),
  );
};
export var NoAnimationPath = function (props) {
  var trajectory = props.trajectory,
    d = props.d,
    color = props.color,
    conflict = props.conflict,
    footprint = props.footprint;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('path', {
      d: d,
      stroke: color,
      opacity: 0.8,
      strokeWidth: conflict ? footprint * 0.8 : footprint,
      strokeLinecap: 'round',
      fill: 'none',
    }),
    conflict
      ? React.createElement(ConflictPath, { d: d, trajectory: trajectory, footprint: footprint })
      : null,
  );
};
export var FollowAnimationPath = function (props) {
  var trajectory = props.trajectory,
    d = props.d,
    color = props.color,
    conflict = props.conflict,
    footprint = props.footprint,
    _a = props.animationScale,
    animationScale = _a === void 0 ? 1 : _a,
    _b = props.animationLoop,
    animationLoop = _b === void 0 ? false : _b;
  var pathRef = React.useRef(null);
  React.useLayoutEffect(
    function () {
      if (!pathRef.current) {
        return;
      }
      var offsets = keyframeOffsets(trajectory);
      var pathAnim = pathRef.current;
      var strokeWidth = Number(pathAnim.getAttribute('stroke-width') || 1);
      var strokeDash = strokeWidth / pathAnim.getTotalLength();
      pathAnim.setAttribute('stroke-dasharray', strokeDash + ' ' + (2 - strokeDash));
      pathAnim.animate(
        offsets.map(function (offset) {
          return {
            offset: offset,
            strokeDashoffset: Math.max(2 - offset, strokeDash + 1),
          };
        }),
        {
          duration: animationDuration(trajectory, animationScale),
          easing: 'linear',
          fill: 'forwards',
          iterations: animationLoop ? Infinity : 1,
        },
      );
      return function () {
        pathAnim.getAnimations().forEach(function (anim) {
          return anim.cancel();
        });
      };
    },
    [animationScale, animationLoop, trajectory],
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('path', {
      d: d,
      stroke: color,
      opacity: 0.4,
      strokeWidth: conflict ? footprint * 0.8 : footprint,
      strokeLinecap: 'round',
      fill: 'none',
    }),
    React.createElement('path', {
      ref: pathRef,
      d: d,
      stroke: color,
      opacity: 0.8,
      strokeWidth: conflict ? footprint * 0.8 : footprint,
      strokeLinecap: 'round',
      fill: 'none',
      pathLength: 1,
      strokeDasharray: 2,
      strokeDashoffset: 2,
    }),
    conflict
      ? React.createElement(ConflictPath, { d: d, trajectory: trajectory, footprint: footprint })
      : null,
  );
};
export var FillAnimationPath = function (props) {
  var trajectory = props.trajectory,
    d = props.d,
    color = props.color,
    conflict = props.conflict,
    footprint = props.footprint,
    _a = props.animationScale,
    animationScale = _a === void 0 ? 1 : _a,
    _b = props.animationLoop,
    animationLoop = _b === void 0 ? false : _b;
  var pathRef = React.useRef(null);
  React.useLayoutEffect(
    function () {
      if (!pathRef.current) {
        return;
      }
      var offsets = keyframeOffsets(trajectory);
      var pathAnim = pathRef.current;
      pathAnim.animate(
        offsets.map(function (offset) {
          return {
            offset: offset,
            strokeDashoffset: 2 - offset,
          };
        }),
        {
          duration: animationDuration(trajectory, animationScale),
          easing: 'linear',
          fill: 'forwards',
          iterations: animationLoop ? Infinity : 1,
        },
      );
      return function () {
        pathAnim.getAnimations().forEach(function (anim) {
          return anim.cancel();
        });
      };
    },
    [trajectory, animationScale, animationLoop],
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('path', {
      d: d,
      stroke: color,
      opacity: 0.4,
      strokeWidth: conflict ? footprint * 0.8 : footprint,
      strokeLinecap: 'round',
      fill: 'none',
    }),
    React.createElement('path', {
      ref: pathRef,
      d: d,
      stroke: color,
      opacity: 0.8,
      strokeWidth: conflict ? footprint * 0.8 : footprint,
      strokeLinecap: 'round',
      fill: 'none',
      pathLength: 1,
      strokeDasharray: 2,
      strokeDashoffset: 2,
    }),
    conflict
      ? React.createElement(ConflictPath, { d: d, trajectory: trajectory, footprint: footprint })
      : null,
  );
};
