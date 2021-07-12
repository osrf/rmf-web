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
import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { RobotInfo } from './robot-info';
import { RobotTable } from './robot-table';
import { allocateTasksToRobots } from './utils';
var useStyles = makeStyles(function (theme) {
  return {
    detailPanelContainer: {
      width: 350,
      padding: theme.spacing(2),
      marginLeft: theme.spacing(1),
      flex: '0 0 auto',
    },
    robotTable: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  };
});
function NoSelectedRobot() {
  return React.createElement(
    Grid,
    { container: true, wrap: 'nowrap', alignItems: 'center', style: { height: '100%' } },
    React.createElement(
      Typography,
      { variant: 'h6', align: 'center', color: 'textSecondary' },
      'Click on a robot to view more information',
    ),
  );
}
export function RobotPanel(_a) {
  var _this = this;
  var robots = _a.robots,
    fetchTasks = _a.fetchTasks,
    divProps = __rest(_a, ['robots', 'fetchTasks']);
  var classes = useStyles();
  var _b = React.useState([]),
    tasks = _b[0],
    setTasks = _b[1];
  var _c = React.useState(-1),
    totalCount = _c[0],
    setTotalCount = _c[1];
  var _d = React.useState(0),
    page = _d[0],
    setPage = _d[1];
  var _e = React.useState(undefined),
    selectedRobot = _e[0],
    setSelectedRobot = _e[1];
  var _f = React.useState([]),
    robotsWithTasks = _f[0],
    setRobotsWithTasks = _f[1];
  var handleRefresh = React.useCallback(
    function (limit, offset, robotName) {
      return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
          (function () {
            return __awaiter(_this, void 0, void 0, function () {
              var result;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/, fetchTasks(limit, offset, robotName)];
                  case 1:
                    result = _a.sent();
                    setTasks(result);
                    return [2 /*return*/];
                }
              });
            });
          })();
          return [2 /*return*/];
        });
      });
    },
    [fetchTasks, page],
  );
  React.useEffect(
    function () {
      handleRefresh();
      setTotalCount(robots.length);
      setRobotsWithTasks(allocateTasksToRobots(robots, tasks));
      if (robotsWithTasks.length > 0) {
        robotsWithTasks.forEach(function (robot) {
          if (
            robot.name ===
            (selectedRobot === null || selectedRobot === void 0 ? void 0 : selectedRobot.name)
          )
            setSelectedRobot(robot);
        });
      }
    },
    [robots, handleRefresh],
  );
  return React.createElement(
    'div',
    __assign({}, divProps),
    React.createElement(
      Grid,
      { container: true, wrap: 'nowrap', justify: 'center', style: { height: 'inherit' } },
      React.createElement(
        Grid,
        { style: { flex: '1 1 auto' } },
        React.createElement(RobotTable, {
          className: classes.robotTable,
          tasks: tasks,
          robots: robots.slice(page * 10, (page + 1) * 10),
          paginationOptions: {
            count: totalCount,
            rowsPerPage: 10,
            rowsPerPageOptions: [10],
            page: page,
            onChangePage: function (_ev, newPage) {
              return setPage(newPage);
            },
          },
          robotsWithTasks: robotsWithTasks,
          onRobotClickAndRefresh: function (robot, _ev) {
            return setSelectedRobot(robot);
          },
          onRefreshTasks: handleRefresh,
        }),
      ),
      React.createElement(
        Paper,
        { className: classes.detailPanelContainer },
        selectedRobot
          ? React.createElement(RobotInfo, { robot: selectedRobot })
          : React.createElement(NoSelectedRobot, null),
      ),
    ),
  );
}
