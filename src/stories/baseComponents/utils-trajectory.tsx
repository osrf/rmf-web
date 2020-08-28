import {
  TrajectoryResponse,
  Trajectory,
  RawKnot,
  rawKnotsToKnots,
  RawVelocity,
} from '../../robot-trajectory-manager';
import { bezierControlPoints, knotsToSegmentCoefficientsArray } from '../../util/cublic-spline';

/***
 * Some documentation on the +ve and -ve signs and the directions that they represent
 * before I or anyone get lost reading through code
 *
 * +ve X = right
 * -ve X = left
 *
 * +ve Y = up
 * -ve Y = down
 *
 * +ve theta = turn right
 * -ve theta = turn left
 *
 * Direction of the velocity is handled in determineVelocity function
 */

export const startingTheta = {
  vertical: {
    value: -1.5643726408832297,
    direction: {
      up: 'up',
      down: 'down',
    },
  },
  horizontal: {
    value: -3.1376738367181622,
    direction: {
      left: 'left',
      right: 'right',
    },
  },
};

/***
 * This function is used to generate a random number for
 * various situations stated below:
 *
 * 1) Generating number of waypoints on a straight path per turn
 * 2) Generating a number (0 or 1) to decide turning direction
 */
const generateNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min) + min);
};

/***
 * This function is used to determine RawVelocity at each turn
 */
const determineVelocity = (theta: number, direction: string, velocity: number): RawVelocity => {
  if (direction === 'up') return [0.0, velocity, theta];
  else if (direction === 'down') return [0.0, -velocity, 0.0];
  else if (direction === 'right') return [velocity, 0.0, theta];
  else return [-velocity, 0.0, 0.0];
};

// determine the index to retrieve velocity in RawVelocity
const determineVelocityIndex = (direction: string): number => {
  switch (direction) {
    case 'up':
    case 'down':
      return 1;
    case 'left':
    case 'right':
      return 0;
    default:
      return 2;
  }
};

// turning direction, 0 = right and 1 = left
const determineThetaVelocity = (direction: number, thetaVelocity: number): number => {
  return direction === 0 ? thetaVelocity : -thetaVelocity;
};

/** Calculate next theta */
const calculateTheta = (currTheta: number, thetaVelocity: number): number => {
  if (currTheta + thetaVelocity > Math.PI) {
    return -Math.PI + (currTheta + thetaVelocity - Math.PI);
  } else if (currTheta + thetaVelocity < -Math.PI) {
    return Math.PI - (currTheta + thetaVelocity + Math.PI);
  } else {
    return currTheta + thetaVelocity;
  }
};

// determine the direction of the straight segment after making a turn
const determineDirection = (currDir: string, thetaVelocity: number): string => {
  if (currDir === 'up' && thetaVelocity > 0) return 'right';
  else if (currDir === 'up' && thetaVelocity < 0) return 'left';
  else if (currDir === 'down' && thetaVelocity > 0) return 'right';
  else if (currDir === 'down' && thetaVelocity < 0) return 'left';
  else if (currDir === 'right' && thetaVelocity > 0) return 'up';
  else if (currDir === 'right' && thetaVelocity < 0) return 'down';
  else if (currDir === 'left' && thetaVelocity > 0) return 'up';
  else return 'down';
};

// 5 < startX < 20
// -11 < startY < -1
export const createSegments = (
  startX: number,
  startY: number,
  startTheta: number,
  direction: string,
): RawKnot[] => {
  // fix number for now
  let turningPoints = 2;
  let startTime = 2000;
  let velocity = 0.5;
  const segment: RawKnot[] = [];
  const interval = 500;
  const thetaVelocity = 0.25 * Math.PI;

  let currVelocity = determineVelocity(startTheta, direction, velocity);
  let currVelocityIndex = startTheta > -Math.PI * 0.5 ? 1 : 0;
  let currX = startX;
  let currY = startY;
  let currTheta = startTheta;
  let currDirection = direction;

  while (turningPoints > -1) {
    // generate number of waypoints per turn
    const pointsPerStraightSegment = generateNumber(8, 10);

    // generate points for a straight segment
    for (let i = 0; i < pointsPerStraightSegment; i++) {
      segment.push({ t: startTime, v: currVelocity, x: [currX, currY, currTheta] });

      startTime += interval;
      const distance = currVelocity[currVelocityIndex] * (interval / 1000);
      currX = currVelocityIndex === 0 ? (currX += distance) : currX;
      currY = currVelocityIndex === 1 ? (currY += distance) : currY;
    }

    if (turningPoints > 0) {
      // static point before turning
      startTime += interval;
      const turningDirection = generateNumber(0, 1);
      const currThetaVelocity = determineThetaVelocity(turningDirection, thetaVelocity);
      segment.push({
        t: startTime,
        v: [0.0, 0.0, currThetaVelocity],
        x: [currX, currY, currTheta],
      });

      // 2 points needed to turn at a speed of 1/4 Radian per second
      for (let i = 0; i < 2; i++) {
        const thetaHolder = calculateTheta(currTheta, currThetaVelocity);
        currTheta = thetaHolder;
        startTime += 500;
        segment.push({
          t: startTime,
          v: [0.0, 0.0, currThetaVelocity],
          x: [currX, currY, currTheta],
        });
      }

      // last static point after finishing the turn
      startTime += interval;
      segment.push({ t: startTime, v: [0.0, 0.0, 0.0], x: [currX, currY, currTheta] });

      // prep for next straight segment
      currDirection = determineDirection(currDirection, currThetaVelocity);
      currVelocity = determineVelocity(0.0, currDirection, velocity);
      currVelocityIndex = determineVelocityIndex(currDirection);
      startTime += interval;
    }

    turningPoints -= 1;
  }
  console.log(segment);
  return segment;
};
