var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import Debug from 'debug';
import React from 'react';
import { trajectoryPath } from './trajectory';
import { FillAnimationPath, FollowAnimationPath, NoAnimationPath } from './trajectory-paths';
var debug = Debug('Robots:TrajectoryMarker');
export var TrajectoryMarker = React.forwardRef(function (props, ref) {
  var trajectory = props.trajectory,
    conflict = props.conflict,
    color = props.color,
    _a = props.variant,
    variant = _a === void 0 ? 'follow' : _a,
    _b = props.animationLoop,
    animationLoop = _b === void 0 ? false : _b,
    _c = props.animationScale,
    animationScale = _c === void 0 ? 1 : _c,
    otherProps = __rest(props, [
      'trajectory',
      'conflict',
      'color',
      'variant',
      'animationLoop',
      'animationScale',
    ]);
  debug('render ' + trajectory.id);
  var footprint = trajectory.dimensions;
  var pathD = React.useMemo(
    function () {
      return trajectoryPath(trajectory.segments).d;
    },
    [trajectory],
  );
  var PathComponent = React.useMemo(
    function () {
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
    },
    [variant],
  );
  return React.createElement(
    'g',
    __assign({ ref: ref }, otherProps),
    React.createElement(PathComponent, {
      trajectory: trajectory,
      d: pathD,
      color: color,
      footprint: footprint,
      conflict: conflict,
      animationLoop: animationLoop,
      animationScale: animationScale,
    }),
  );
});
export default TrajectoryMarker;
