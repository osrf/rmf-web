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
import { makeStyles } from '@material-ui/core';
import Debug from 'debug';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { joinClasses } from '../css-utils';
import { fromRmfCoords } from '../geometry-utils';
var debug = Debug('Doors:DoorMarker');
var useDoorStyles = makeStyles({
  marker: {
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
  base: {
    strokeWidth: 0.2,
  },
  open: {
    stroke: '#AFDDAE',
    strokeDasharray: 0.1,
  },
  close: {
    stroke: '#BC4812',
  },
  moving: {
    stroke: '#E9CE9F',
    strokeDasharray: 0.3,
  },
  unknown: {
    stroke: 'grey',
  },
  transparent: {
    stroke: 'transparent',
  },
});
function useDoorStyle(doorMode) {
  var classes = useDoorStyles();
  if (!doorMode) {
    return classes.unknown;
  }
  switch (doorMode.value) {
    case RmfModels.DoorMode.MODE_OPEN:
      return classes.open;
    case RmfModels.DoorMode.MODE_MOVING:
      return classes.moving;
    case RmfModels.DoorMode.MODE_CLOSED:
      return classes.close;
    default:
      return classes.unknown;
  }
}
function getDoorCenter(door) {
  var v1 = [door.v1_x, door.v1_y];
  var v2 = [door.v2_x, door.v2_y];
  switch (door.door_type) {
    case RmfModels.Door.DOOR_TYPE_SINGLE_SLIDING:
    case RmfModels.Door.DOOR_TYPE_SINGLE_SWING:
    case RmfModels.Door.DOOR_TYPE_SINGLE_TELESCOPE:
    case RmfModels.Door.DOOR_TYPE_DOUBLE_SLIDING:
    case RmfModels.Door.DOOR_TYPE_DOUBLE_SWING:
    case RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE:
      return [(v1[0] + v2[0]) / 2, (v2[1] + v1[1]) / 2];
    default:
      throw new Error('unknown door type');
  }
}
var BaseDoor = function (props) {
  var v1_ = props.v1,
    v2_ = props.v2,
    className = props.className;
  var classes = useDoorStyles();
  var v1 = fromRmfCoords(v1_);
  var v2 = fromRmfCoords(v2_);
  return React.createElement(
    'g',
    null,
    React.createElement('line', {
      className: joinClasses(classes.base, className),
      x1: v1[0],
      y1: v1[1],
      x2: v2[0],
      y2: v2[1],
    }),
  );
};
/**
 * Because we are using stroke-dash in some of the classes, it makes it such that only
 * the rendered line will be considered for click detection. To workaround it, we use
 * a transparent door on top of the marker, this dummy door will be used to allow the
 * full door to be clickable.
 */
var DummyDoor = function (props) {
  var v1 = props.v1,
    v2 = props.v2;
  var classes = useDoorStyles();
  return React.createElement(
    'g',
    null,
    React.createElement('line', {
      className: joinClasses(classes.base, classes.transparent),
      x1: v1[0],
      y1: -v1[1],
      x2: v2[0],
      y2: -v2[1],
    }),
  );
};
/*
 * Single swing doors:
 *  - hinge is located at (v1_x, v1_y)
 *  - door extends till (v2_x, v2_y)
 *  - motion_range = door swing range in DEGREES
 *  - there are two possible motions: clockwise and anti-clockwise
 *  - selected by the motion_direction parameter, which is +1 or -1
 */
var SingleSwingDoor = function (props) {
  var door = props.door,
    doorMode = props.doorMode;
  var doorStyle = useDoorStyle(doorMode);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(BaseDoor, {
      v1: [door.v1_x, door.v1_y],
      v2: [door.v2_x, door.v2_y],
      className: doorStyle,
    }),
    React.createElement(DummyDoor, { v1: [door.v1_x, door.v1_y], v2: [door.v2_x, door.v2_y] }),
  );
};
/*
 * Single sliding doors:
 *  - the door slides from (v2_x, v2_y) towards (v1_x, v1_y)
 *  - range of motion is entire distance from v2->v1. No need to specify.
 */
var SingleSlidingDoor = SingleSwingDoor;
/*
 * single/double telescoping doors:
 *   * common in elevators; same parameters as sliding doors; they just
 *     open/close faster and take up less space inside the wall.
 */
var SingleTelescopeDoor = SingleSlidingDoor;
/**
 * Double hinge doors:
 * - hinges are located at both (v1_x, v1_y) and (v2_x, v2_y)
 * - motion range = door swing ranges in DEGREES (assume symmetric)
 * - same motion-direction selection as single hinge
 */
var DoubleSwingDoor = function (props) {
  var door = props.door,
    doorMode = props.doorMode;
  var _a = [door.v1_x, door.v1_y, door.v2_x, door.v2_y],
    hingeX1 = _a[0],
    hingeY1 = _a[1],
    hingeX2 = _a[2],
    hingeY2 = _a[3];
  var _b = [hingeX1 + (door.v2_x - door.v1_x) / 2, hingeY1 + (door.v2_y - door.v1_y) / 2],
    extendX1 = _b[0],
    extendY1 = _b[1];
  var doorStyle = useDoorStyle(doorMode);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(BaseDoor, {
      v1: [hingeX1, hingeY1],
      v2: [extendX1, extendY1],
      className: doorStyle,
    }),
    React.createElement(BaseDoor, {
      v1: [extendX1, extendY1],
      v2: [hingeX2, hingeY2],
      className: doorStyle,
    }),
    React.createElement(DummyDoor, { v1: [hingeX1, hingeY1], v2: [extendX1, extendY1] }),
  );
};
/*
 * Double sliding doors:
 *  - door panels slide from the centerpoint of v1<->v2 towards v1 and v2
 *  - the door slides from (v2_x, v2_y) towards (v1_x, v1_y)
 */
var DoubleSlidingDoor = DoubleSwingDoor;
/*
 * single/double telescoping doors:
 *   * common in elevators; same parameters as sliding doors; they just
 *     open/close faster and take up less space inside the wall.
 */
var DoubleTelescopeDoor = DoubleSlidingDoor;
export var DoorMarker = React.forwardRef(function (props, ref) {
  var door = props.door,
    doorMode = props.doorMode,
    _a = props.translate,
    translate = _a === void 0 ? true : _a,
    onClick = props.onClick,
    otherProps = __rest(props, ['door', 'doorMode', 'translate', 'onClick']);
  debug('render ' + door.name);
  var classes = useDoorStyles();
  var renderDoor = function () {
    switch (door.door_type) {
      case RmfModels.Door.DOOR_TYPE_SINGLE_SWING:
        return React.createElement(SingleSwingDoor, { door: door, doorMode: doorMode });
      case RmfModels.Door.DOOR_TYPE_SINGLE_SLIDING:
        return React.createElement(SingleSlidingDoor, { door: door, doorMode: doorMode });
      case RmfModels.Door.DOOR_TYPE_SINGLE_TELESCOPE:
        return React.createElement(SingleTelescopeDoor, { door: door, doorMode: doorMode });
      case RmfModels.Door.DOOR_TYPE_DOUBLE_SWING:
        return React.createElement(DoubleSwingDoor, { door: door, doorMode: doorMode });
      case RmfModels.Door.DOOR_TYPE_DOUBLE_SLIDING:
        return React.createElement(DoubleSlidingDoor, { door: door, doorMode: doorMode });
      case RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE:
        return React.createElement(DoubleTelescopeDoor, { door: door, doorMode: doorMode });
      default:
        return null;
    }
  };
  try {
    var center = getDoorCenter(door);
    return React.createElement(
      'g',
      __assign(
        {
          ref: ref,
          onClick: function (ev) {
            return onClick && onClick(ev, door);
          },
        },
        otherProps,
      ),
      React.createElement(
        'g',
        {
          className: onClick ? classes.marker : undefined,
          transform: !translate ? 'translate(' + -center[0] + ' ' + center[1] + ')' : undefined,
        },
        renderDoor(),
      ),
    );
  } catch (e) {
    console.error(e.message);
    return null;
  }
});
export default DoorMarker;
