export function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}
/**
 * Transform coords on the middle of a SVG's Rect to top left coords.
 */
export function transformMiddleCoordsOfRectToSVGBeginPoint(x, y, width, depth) {
  return [x - width / 2, y + depth / 2];
}
/**
 * Converts a svg coordinate to RMF.
 * @param pos
 */
export function toRmfCoords(pos) {
  return [pos[0], -pos[1]];
}
/**
 * Converts a RMF coordinate to SVG
 * @param pos
 */
export function fromRmfCoords(pos) {
  return [pos[0], -pos[1]];
}
/**
 * Converts a SVG rotation (in radians) to RMF yaw (in radians)
 * @param yaw
 */
export function toRmfYaw(yaw) {
  return -yaw;
}
/**
 * Converts a RMF yaw angle (in radians) to svg (in radians)
 * @param yaw
 */
export function fromRmfYaw(yaw) {
  return -yaw;
}
export function segmentToCoefficientSet(segment) {
  var x0 = segment.initialPose,
    x1 = segment.finalPose,
    v0 = segment.initialVelocity,
    v1 = segment.finalVelocity,
    initialTime = segment.initialTime,
    finalTime = segment.finalTime;
  var dt = finalTime - initialTime;
  var w0 = v0 / dt;
  var w1 = v1 / dt;
  var a = w1 + w0 - x1 * 2 + x0 * 2;
  var b = -w1 - w0 * 2 + x1 * 3 - x0 * 3;
  return {
    a: a,
    b: b,
    c: w0,
    d: x0,
  };
}
export function assignKnotsToSegment(knot, nextKnot, forCoordinate) {
  return {
    initialPose: knot.pose[forCoordinate],
    finalPose: nextKnot.pose[forCoordinate],
    initialVelocity: knot.velocity[forCoordinate],
    finalVelocity: nextKnot.velocity[forCoordinate],
    initialTime: knot.time,
    finalTime: nextKnot.time,
  };
}
export function knotsToSegmentCoefficientsArray(knots) {
  var scs = [];
  for (var i = 0; i < knots.length - 1; ++i) {
    var knot = knots[i];
    var nextKnot = knots[i + 1];
    var sc = {
      x: segmentToCoefficientSet(assignKnotsToSegment(knot, nextKnot, 'x')),
      y: segmentToCoefficientSet(assignKnotsToSegment(knot, nextKnot, 'y')),
      theta: segmentToCoefficientSet(assignKnotsToSegment(knot, nextKnot, 'theta')),
      initialTime: knot.time,
      finalTime: nextKnot.time,
    };
    scs.push(sc);
  }
  return scs;
}
export function getInterpolatedTime(initialTime, finalTime, time) {
  return (time - initialTime) / (finalTime - initialTime);
}
export function resolveSpline(
  coefficientSet,
  interpolatedTime,
  interpolatedTimePow2,
  interpolatedTimePow3,
) {
  if (interpolatedTimePow2 === void 0) {
    interpolatedTimePow2 = Math.pow(interpolatedTime, 2);
  }
  if (interpolatedTimePow3 === void 0) {
    interpolatedTimePow3 = Math.pow(interpolatedTime, 3);
  }
  return (
    coefficientSet.a * interpolatedTimePow3 +
    coefficientSet.b * interpolatedTimePow2 +
    coefficientSet.c * interpolatedTime +
    coefficientSet.d
  );
}
export function getPositionFromSegmentCoefficientsArray(time, scs) {
  var sc;
  for (var _i = 0, scs_1 = scs; _i < scs_1.length; _i++) {
    sc = scs_1[_i];
    if (time >= sc.initialTime && time <= sc.finalTime) {
      break;
    }
  }
  if (!sc) {
    return null;
  }
  var xCoeff = sc.x,
    yCoeff = sc.y,
    thetaCoeff = sc.theta,
    initialTime = sc.initialTime,
    finalTime = sc.finalTime;
  var interpolatedTime = getInterpolatedTime(initialTime, finalTime, time);
  var interpolatedTimePow2 = Math.pow(interpolatedTime, 2);
  var interpolatedTimePow3 = Math.pow(interpolatedTime, 3);
  return {
    x: resolveSpline(xCoeff, interpolatedTime, interpolatedTimePow2, interpolatedTimePow3),
    y: resolveSpline(yCoeff, interpolatedTime, interpolatedTimePow2, interpolatedTimePow3),
    theta: resolveSpline(thetaCoeff, interpolatedTime, interpolatedTimePow2, interpolatedTimePow3),
  };
}
function bezierHelper(coeffs) {
  var a = coeffs.a;
  var b = coeffs.b;
  var c = coeffs.c;
  var d = coeffs.d;
  var p0 = d;
  var p1 = (c + p0 * 3) / 3;
  var p2 = (b - p0 * 3 + p1 * 6) / 3;
  var p3 = a + p0 - p1 * 3 + p2 * 3;
  return [p0, p1, p2, p3];
}
export function bezierControlPoints(segmentCoefficients) {
  var px = bezierHelper(segmentCoefficients.x);
  var py = bezierHelper(segmentCoefficients.y);
  return px.map(function (x, i) {
    return [x, py[i]];
  });
}
