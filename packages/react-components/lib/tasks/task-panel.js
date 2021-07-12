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
import { Grid, makeStyles, Paper, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import * as RmfModels from 'rmf-models';
import { CreateTaskForm } from './create-task';
import { TaskInfo } from './task-info';
import { TaskTable } from './task-table';
import { parseTasksFile } from './utils';
var useStyles = makeStyles(function (theme) {
  return {
    detailPanelContainer: {
      width: 350,
      padding: theme.spacing(2),
      marginLeft: theme.spacing(1),
      flex: '0 0 auto',
    },
    taskTable: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  };
});
function NoSelectedTask() {
  return React.createElement(
    Grid,
    { container: true, wrap: 'nowrap', alignItems: 'center', style: { height: '100%' } },
    React.createElement(
      Typography,
      { variant: 'h6', align: 'center', color: 'textSecondary' },
      'Click on a task to view more information',
    ),
  );
}
export function TaskPanel(_a) {
  var _this = this;
  var fetchTasks = _a.fetchTasks,
    cleaningZones = _a.cleaningZones,
    loopWaypoints = _a.loopWaypoints,
    deliveryWaypoints = _a.deliveryWaypoints,
    dispensers = _a.dispensers,
    ingestors = _a.ingestors,
    submitTasks = _a.submitTasks,
    cancelTask = _a.cancelTask,
    divProps = __rest(_a, [
      'fetchTasks',
      'cleaningZones',
      'loopWaypoints',
      'deliveryWaypoints',
      'dispensers',
      'ingestors',
      'submitTasks',
      'cancelTask',
    ]);
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
    selectedTask = _e[0],
    setSelectedTask = _e[1];
  var uploadFileInputRef = React.useRef(null);
  var _f = React.useState(false),
    openCreateTaskForm = _f[0],
    setOpenCreateTaskForm = _f[1];
  var _g = React.useState(false),
    openSnackbar = _g[0],
    setOpenSnackbar = _g[1];
  var _h = React.useState(''),
    snackbarMessage = _h[0],
    setSnackbarMessage = _h[1];
  var _j = React.useState('success'),
    snackbarSeverity = _j[0],
    setSnackbarSeverity = _j[1];
  var handleRefresh = React.useCallback(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
          (function () {
            return __awaiter(_this, void 0, void 0, function () {
              var result,
                cancelledTask,
                activeTask,
                pendingTask,
                completedTask,
                failedTask,
                queuedTask;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/, fetchTasks(20, page * 20)];
                  case 1:
                    result = _a.sent();
                    cancelledTask = [];
                    activeTask = [];
                    pendingTask = [];
                    completedTask = [];
                    failedTask = [];
                    queuedTask = [];
                    result.tasks.forEach(function (task) {
                      if (task.state === RmfModels.TaskSummary.STATE_CANCELED)
                        cancelledTask.push(task);
                      else if (task.state === RmfModels.TaskSummary.STATE_ACTIVE)
                        activeTask.push(task);
                      else if (task.state === RmfModels.TaskSummary.STATE_QUEUED)
                        queuedTask.push(task);
                      else if (task.state === RmfModels.TaskSummary.STATE_COMPLETED)
                        completedTask.push(task);
                      else if (task.state === RmfModels.TaskSummary.STATE_FAILED)
                        failedTask.push(task);
                      else if (task.state === RmfModels.TaskSummary.STATE_PENDING)
                        pendingTask.push(task);
                    });
                    setTasks(
                      activeTask.concat(
                        queuedTask,
                        pendingTask,
                        completedTask,
                        failedTask,
                        cancelledTask,
                      ),
                    );
                    setTotalCount(result.totalCount);
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
  var handleCancelTask = React.useCallback(
    function (task) {
      return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!cancelTask) {
                return [2 /*return*/];
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 4, , 5]);
              return [4 /*yield*/, cancelTask(task)];
            case 2:
              _a.sent();
              setSnackbarMessage('Successfully cancelled task');
              setSnackbarSeverity('success');
              setOpenSnackbar(true);
              setSelectedTask(undefined);
              return [4 /*yield*/, handleRefresh()];
            case 3:
              _a.sent();
              return [3 /*break*/, 5];
            case 4:
              e_1 = _a.sent();
              setSnackbarMessage('Failed to cancel task: ' + e_1.message);
              setSnackbarSeverity('error');
              setOpenSnackbar(true);
              return [3 /*break*/, 5];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [cancelTask, handleRefresh],
  );
  /* istanbul ignore next */
  var tasksFromFile = function () {
    return new Promise(function (res) {
      var fileInputEl = uploadFileInputRef.current;
      if (!fileInputEl) {
        return [];
      }
      var listener = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a, _b;
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                _c.trys.push([0, , 2, 3]);
                if (!fileInputEl.files || fileInputEl.files.length === 0) {
                  return [2 /*return*/, res([])];
                }
                _a = res;
                _b = parseTasksFile;
                return [4 /*yield*/, fileInputEl.files[0].text()];
              case 1:
                return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent()])])];
              case 2:
                fileInputEl.removeEventListener('input', listener);
                fileInputEl.value = '';
                return [7 /*endfinally*/];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      };
      fileInputEl.addEventListener('input', listener);
      fileInputEl.click();
    });
  };
  React.useEffect(
    function () {
      handleRefresh();
    },
    [handleRefresh],
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
        React.createElement(TaskTable, {
          className: classes.taskTable,
          tasks: tasks,
          paginationOptions: {
            count: totalCount,
            rowsPerPage: 20,
            rowsPerPageOptions: [20],
            page: page,
            onChangePage: function (_ev, newPage) {
              return setPage(newPage);
            },
          },
          onCreateTaskClick: function () {
            return setOpenCreateTaskForm(true);
          },
          onTaskClick: function (_ev, task) {
            return setSelectedTask(task);
          },
          onRefreshClick: handleRefresh,
        }),
      ),
      React.createElement(
        Paper,
        { className: classes.detailPanelContainer },
        selectedTask
          ? React.createElement(TaskInfo, {
              task: selectedTask,
              onCancelTaskClick: function () {
                return handleCancelTask(selectedTask);
              },
            })
          : React.createElement(NoSelectedTask, null),
      ),
    ),
    openCreateTaskForm &&
      React.createElement(CreateTaskForm, {
        cleaningZones: cleaningZones,
        loopWaypoints: loopWaypoints,
        deliveryWaypoints: deliveryWaypoints,
        dispensers: dispensers,
        ingestors: ingestors,
        open: openCreateTaskForm,
        onClose: function () {
          return setOpenCreateTaskForm(false);
        },
        submitTasks: submitTasks,
        tasksFromFile: tasksFromFile,
        onCancelClick: function () {
          return setOpenCreateTaskForm(false);
        },
        onSuccess: function () {
          setOpenCreateTaskForm(false);
          setSnackbarSeverity('success');
          setSnackbarMessage('Successfully created task');
          setOpenSnackbar(true);
          handleRefresh();
        },
        onFail: function (e) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to create task: ' + e.message);
          setOpenSnackbar(true);
        },
      }),
    React.createElement('input', {
      type: 'file',
      style: { display: 'none' },
      ref: uploadFileInputRef,
    }),
    React.createElement(
      Snackbar,
      {
        open: openSnackbar,
        onClose: function () {
          return setOpenSnackbar(false);
        },
        autoHideDuration: 2000,
      },
      React.createElement(Alert, { severity: snackbarSeverity }, snackbarMessage),
    ),
  );
}
