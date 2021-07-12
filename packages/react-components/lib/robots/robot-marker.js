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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { ColorContext, SvgText } from '..';
import { fromRmfCoords, fromRmfYaw } from '../geometry-utils';
import { DefaultMarker } from './default-marker';
import { ImageMarker } from './image-marker';
var debug = Debug('Robots:RobotMarker');
var useStyles = makeStyles(function () {
  return {
    text: {
      dominantBaseline: 'central',
      textAnchor: 'middle',
      fontSize: '0.18px',
      fontWeight: 'bold',
      fill: 'white',
      /* 1 pixel black shadow to left, top, right and bottom */
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      pointerEvents: 'none',
      userSelect: 'none',
    },
    clickable: {
      pointerEvents: 'auto',
      cursor: 'pointer',
    },
  };
});
/**
 * Contexts: ColorContext
 */
export var RobotMarker = React.forwardRef(function (props, ref) {
  // some props are not used but have to be declared to correctly set `otherProps`
  var robot = props.robot,
    footprint = props.footprint,
    fleetName = props.fleetName,
    iconPath = props.iconPath,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    variant = props.variant,
    _a = props.translate,
    translate = _a === void 0 ? true : _a,
    onClick = props.onClick,
    otherProps = __rest(props, [
      'robot',
      'footprint',
      'fleetName',
      'iconPath',
      'variant',
      'translate',
      'onClick',
    ]);
  debug('render ' + robot.name);
  var _b = React.useState(!!iconPath),
    useImageMarker = _b[0],
    setUseImageMarker = _b[1];
  var _c = React.useState(undefined),
    robotColor = _c[0],
    setRobotColor = _c[1];
  var colorManager = React.useContext(ColorContext);
  var classes = useStyles();
  var pos = fromRmfCoords([robot.location.x, robot.location.y]);
  var yaw = (fromRmfYaw(robot.location.yaw) / Math.PI) * 180;
  var translateTransform = translate ? 'translate(' + pos[0] + ' ' + pos[1] + ')' : undefined;
  var isMounted = React.useRef(true);
  React.useEffect(function () {
    return function () {
      isMounted.current = false;
    };
  }, []);
  React.useEffect(
    function () {
      if (useImageMarker) {
        return;
      }
      (function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var color;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  colorManager.robotPrimaryColor(fleetName, robot.name, robot.model),
                ];
              case 1:
                color = _a.sent();
                isMounted.current && setRobotColor(color);
                return [2 /*return*/];
            }
          });
        });
      })();
    },
    [colorManager, fleetName, robot.model, robot.name, useImageMarker],
  );
  return React.createElement(
    'g',
    __assign(
      {
        ref: ref,
        onClick: function (ev) {
          return onClick && onClick(ev, fleetName, robot);
        },
      },
      otherProps,
    ),
    React.createElement(
      'g',
      { transform: translateTransform },
      React.createElement(
        'g',
        {
          className: classes.clickable,
          'aria-label': robot.name,
          transform: 'rotate(' + yaw + ')',
        },
        useImageMarker && iconPath
          ? React.createElement(
              ImageMarker,
              __assign({}, props, {
                iconPath: iconPath,
                onError: function () {
                  return setUseImageMarker(false);
                },
              }),
            )
          : robotColor
          ? React.createElement(DefaultMarker, __assign({ color: robotColor }, props))
          : null,
      ),
      React.createElement(SvgText, {
        text: robot.name,
        targetWidth: footprint * 1.9,
        className: classes.text,
      }),
    ),
  );
});
export default RobotMarker;
