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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
    return to;
  };
import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import * as RmfModels from 'rmf-models';
var useStyles = makeStyles(function (theme) {
  return {
    selectFileBtn: {
      marginBottom: theme.spacing(1),
    },
    taskList: {
      flex: '1 1 auto',
      minHeight: 400,
      maxHeight: '50vh',
      overflow: 'auto',
    },
    selectedTask: {
      background: theme.palette.action.focus,
    },
  };
});
function getShortDescription(task) {
  switch (task.task_type) {
    case RmfModels.TaskType.TYPE_CLEAN: {
      var desc = task.description;
      return '[Clean] zone [' + desc.cleaning_zone + ']';
    }
    case RmfModels.TaskType.TYPE_DELIVERY: {
      var desc = task.description;
      return (
        '[Delivery] from [' + desc.pickup_place_name + '] to [' + desc.dropoff_place_name + ']'
      );
    }
    case RmfModels.TaskType.TYPE_LOOP: {
      var desc = task.description;
      return '[Loop] from [' + desc.start_name + '] to [' + desc.finish_name + ']';
    }
    default:
      return '[Unknown] type ' + task.task_type;
  }
}
function FormToolbar(_a) {
  var onSelectFileClick = _a.onSelectFileClick;
  var classes = useStyles();
  return React.createElement(
    Grid,
    { container: true, wrap: 'nowrap', alignItems: 'center' },
    React.createElement(
      Grid,
      { style: { flexGrow: 1 } },
      React.createElement(Typography, { variant: 'h6' }, 'Create Task'),
    ),
    React.createElement(
      Grid,
      null,
      React.createElement(
        Button,
        {
          'aria-label': 'Select File',
          className: classes.selectFileBtn,
          variant: 'contained',
          color: 'primary',
          onClick: onSelectFileClick,
        },
        'Select File',
      ),
    ),
  );
}
function DeliveryTaskForm(_a) {
  var taskDesc = _a.taskDesc,
    deliveryWaypoints = _a.deliveryWaypoints,
    dispensers = _a.dispensers,
    ingestors = _a.ingestors,
    onChange = _a.onChange;
  var theme = useTheme();
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Grid,
      { container: true, wrap: 'nowrap' },
      React.createElement(
        Grid,
        { style: { flex: '1 1 60%' } },
        React.createElement(Autocomplete, {
          id: 'pickup-location',
          freeSolo: true,
          fullWidth: true,
          options: deliveryWaypoints,
          value: taskDesc.pickup_place_name,
          onChange: function (_ev, newValue) {
            return onChange(__assign(__assign({}, taskDesc), { pickup_place_name: newValue }));
          },
          onBlur: function (ev) {
            return onChange(
              __assign(__assign({}, taskDesc), { pickup_place_name: ev.target.value }),
            );
          },
          renderInput: function (params) {
            return React.createElement(
              TextField,
              __assign({}, params, { label: 'Pickup Location', margin: 'normal' }),
            );
          },
        }),
      ),
      React.createElement(
        Grid,
        {
          style: {
            flex: '1 1 40%',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
          },
        },
        React.createElement(Autocomplete, {
          id: 'dispenser',
          freeSolo: true,
          fullWidth: true,
          options: dispensers,
          value: taskDesc.pickup_dispenser,
          onChange: function (_ev, newValue) {
            return onChange(__assign(__assign({}, taskDesc), { pickup_dispenser: newValue }));
          },
          onBlur: function (ev) {
            return onChange(
              __assign(__assign({}, taskDesc), { pickup_dispenser: ev.target.value }),
            );
          },
          renderInput: function (params) {
            return React.createElement(
              TextField,
              __assign({}, params, { label: 'Dispenser', margin: 'normal' }),
            );
          },
        }),
      ),
    ),
    React.createElement(
      Grid,
      { container: true, wrap: 'nowrap' },
      React.createElement(
        Grid,
        { style: { flex: '1 1 60%' } },
        React.createElement(Autocomplete, {
          id: 'dropoff-location',
          freeSolo: true,
          fullWidth: true,
          options: deliveryWaypoints,
          value: taskDesc.dropoff_place_name,
          onChange: function (_ev, newValue) {
            return onChange(__assign(__assign({}, taskDesc), { dropoff_place_name: newValue }));
          },
          onBlur: function (ev) {
            return onChange(
              __assign(__assign({}, taskDesc), { dropoff_place_name: ev.target.value }),
            );
          },
          renderInput: function (params) {
            return React.createElement(
              TextField,
              __assign({}, params, { label: 'Dropoff Location', margin: 'normal' }),
            );
          },
        }),
      ),
      React.createElement(
        Grid,
        {
          style: {
            flex: '1 1 40%',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
          },
        },
        React.createElement(Autocomplete, {
          id: 'ingestor',
          freeSolo: true,
          fullWidth: true,
          options: ingestors,
          value: taskDesc.dropoff_ingestor,
          onChange: function (_ev, newValue) {
            return onChange(__assign(__assign({}, taskDesc), { dropoff_ingestor: newValue }));
          },
          onBlur: function (ev) {
            return onChange(
              __assign(__assign({}, taskDesc), { dropoff_ingestor: ev.target.value }),
            );
          },
          renderInput: function (params) {
            return React.createElement(
              TextField,
              __assign({}, params, { label: 'Ingestor', margin: 'normal' }),
            );
          },
        }),
      ),
    ),
  );
}
function LoopTaskForm(_a) {
  var taskDesc = _a.taskDesc,
    loopWaypoints = _a.loopWaypoints,
    onChange = _a.onChange;
  var theme = useTheme();
  var _b = React.useState(taskDesc.num_loops.toString()),
    numOfLoops = _b[0],
    setNumOfLoops = _b[1];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Autocomplete, {
      id: 'start-location',
      freeSolo: true,
      fullWidth: true,
      options: loopWaypoints,
      value: taskDesc.start_name,
      onChange: function (_ev, newValue) {
        return onChange(__assign(__assign({}, taskDesc), { start_name: newValue }));
      },
      onBlur: function (ev) {
        return onChange(__assign(__assign({}, taskDesc), { start_name: ev.target.value }));
      },
      renderInput: function (params) {
        return React.createElement(
          TextField,
          __assign({}, params, { label: 'Start Location', margin: 'normal' }),
        );
      },
    }),
    React.createElement(
      Grid,
      { container: true, wrap: 'nowrap' },
      React.createElement(
        Grid,
        { style: { flex: '1 1 100%' } },
        React.createElement(Autocomplete, {
          id: 'finish-location',
          freeSolo: true,
          fullWidth: true,
          options: loopWaypoints,
          value: taskDesc.finish_name,
          onChange: function (_ev, newValue) {
            return onChange(__assign(__assign({}, taskDesc), { finish_name: newValue }));
          },
          onBlur: function (ev) {
            return onChange(__assign(__assign({}, taskDesc), { finish_name: ev.target.value }));
          },
          renderInput: function (params) {
            return React.createElement(
              TextField,
              __assign({}, params, { label: 'Finish Location', margin: 'normal' }),
            );
          },
        }),
      ),
      React.createElement(
        Grid,
        {
          style: {
            flex: '0 1 5em',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
          },
        },
        React.createElement(TextField, {
          id: 'loops',
          type: 'number',
          label: 'Loops',
          margin: 'normal',
          value: numOfLoops,
          onChange: function (ev) {
            setNumOfLoops(ev.target.value);
            onChange(
              __assign(__assign({}, taskDesc), { num_loops: parseInt(ev.target.value) || 1 }),
            );
          },
        }),
      ),
    ),
  );
}
function CleanTaskForm(_a) {
  var taskDesc = _a.taskDesc,
    cleaningZones = _a.cleaningZones,
    onChange = _a.onChange;
  return React.createElement(Autocomplete, {
    id: 'cleaning-zone',
    freeSolo: true,
    fullWidth: true,
    options: cleaningZones,
    value: taskDesc.cleaning_zone,
    onChange: function (_ev, newValue) {
      return onChange(__assign(__assign({}, taskDesc), { cleaning_zone: newValue }));
    },
    onBlur: function (ev) {
      return onChange(__assign(__assign({}, taskDesc), { cleaning_zone: ev.target.value }));
    },
    renderInput: function (params) {
      return React.createElement(
        TextField,
        __assign({}, params, { label: 'Cleaning Zone', margin: 'normal' }),
      );
    },
  });
}
function defaultCleanTask() {
  return {
    cleaning_zone: '',
  };
}
function defaultLoopsTask() {
  return {
    start_name: '',
    finish_name: '',
    num_loops: 1,
  };
}
function defaultDeliveryTask() {
  return {
    pickup_place_name: '',
    pickup_dispenser: '',
    dropoff_place_name: '',
    dropoff_ingestor: '',
  };
}
function defaultTaskDescription(taskType) {
  switch (taskType) {
    case RmfModels.TaskType.TYPE_CLEAN:
      return defaultCleanTask();
    case RmfModels.TaskType.TYPE_LOOP:
      return defaultLoopsTask();
    case RmfModels.TaskType.TYPE_DELIVERY:
      return defaultDeliveryTask();
    default:
      return undefined;
  }
}
function defaultTask() {
  return {
    description: defaultCleanTask(),
    start_time: Math.floor(Date.now() / 1000),
    task_type: -1,
    priority: 0,
  };
}
export function CreateTaskForm(_a) {
  var _this = this;
  var _b = _a.cleaningZones,
    cleaningZones = _b === void 0 ? [] : _b,
    _c = _a.loopWaypoints,
    loopWaypoints = _c === void 0 ? [] : _c,
    _d = _a.deliveryWaypoints,
    deliveryWaypoints = _d === void 0 ? [] : _d,
    _e = _a.dispensers,
    dispensers = _e === void 0 ? [] : _e,
    _f = _a.ingestors,
    ingestors = _f === void 0 ? [] : _f,
    submitTasks = _a.submitTasks,
    tasksFromFile = _a.tasksFromFile,
    onSuccess = _a.onSuccess,
    onFail = _a.onFail,
    onCancelClick = _a.onCancelClick,
    dialogProps = __rest(_a, [
      'cleaningZones',
      'loopWaypoints',
      'deliveryWaypoints',
      'dispensers',
      'ingestors',
      'submitTasks',
      'tasksFromFile',
      'onSuccess',
      'onFail',
      'onCancelClick',
    ]);
  var theme = useTheme();
  var classes = useStyles();
  var _g = React.useState(function () {
      return [defaultTask()];
    }),
    tasks = _g[0],
    setTasks = _g[1];
  var _h = React.useState(0),
    selectedTaskIdx = _h[0],
    setSelectedTaskIdx = _h[1];
  var _j = React.useState('0'),
    priorityInput = _j[0],
    setPriorityInput = _j[1];
  var taskTitles = React.useMemo(
    function () {
      return (
        tasks &&
        tasks.map(function (t, i) {
          return i + 1 + ': ' + getShortDescription(t);
        })
      );
    },
    [tasks],
  );
  var _k = React.useState(false),
    submitting = _k[0],
    setSubmitting = _k[1];
  var task = tasks[selectedTaskIdx];
  var updateTasks = function () {
    setTasks(function (prev) {
      prev.splice(selectedTaskIdx, 1, task);
      return __spreadArray([], prev);
    });
  };
  var handleTaskDescriptionChange = function (newType, newDesc) {
    task.task_type = newType;
    task.description = newDesc;
    updateTasks();
  };
  var renderTaskDescriptionForm = function () {
    if (task.task_type === -1) {
      return null;
    }
    switch (task.task_type) {
      case RmfModels.TaskType.TYPE_CLEAN:
        return React.createElement(CleanTaskForm, {
          taskDesc: task.description,
          cleaningZones: cleaningZones,
          onChange: function (desc) {
            return handleTaskDescriptionChange(RmfModels.TaskType.TYPE_CLEAN, desc);
          },
        });
      case RmfModels.TaskType.TYPE_LOOP:
        return React.createElement(LoopTaskForm, {
          taskDesc: task.description,
          loopWaypoints: loopWaypoints,
          onChange: function (desc) {
            return handleTaskDescriptionChange(RmfModels.TaskType.TYPE_LOOP, desc);
          },
        });
      case RmfModels.TaskType.TYPE_DELIVERY:
        return React.createElement(DeliveryTaskForm, {
          taskDesc: task.description,
          deliveryWaypoints: deliveryWaypoints,
          dispensers: dispensers,
          ingestors: ingestors,
          onChange: function (desc) {
            return handleTaskDescriptionChange(RmfModels.TaskType.TYPE_DELIVERY, desc);
          },
        });
      default:
        return null;
    }
  };
  var handleTaskTypeChange = function (ev) {
    var newType = parseInt(ev.target.value);
    var newDesc = defaultTaskDescription(newType);
    if (newDesc === undefined) {
      return;
    }
    task.description = newDesc;
    task.task_type = newType;
    updateTasks();
  };
  // no memo because deps would likely change
  var handleSubmit = function (ev) {
    ev.preventDefault();
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!submitTasks) {
                onSuccess && onSuccess(tasks);
                return [2 /*return*/];
              }
              setSubmitting(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              setSubmitting(true);
              return [4 /*yield*/, submitTasks(tasks)];
            case 2:
              _a.sent();
              onSuccess && onSuccess(tasks);
              return [3 /*break*/, 5];
            case 3:
              e_1 = _a.sent();
              onFail && onFail(e_1, tasks);
              return [3 /*break*/, 5];
            case 4:
              setSubmitting(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    })();
  };
  var handleSelectFileClick = function () {
    if (!tasksFromFile) {
      return;
    }
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var newTasks;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, tasksFromFile()];
            case 1:
              newTasks = _a.sent();
              if (newTasks.length === 0) {
                return [2 /*return*/];
              }
              setTasks(newTasks);
              setSelectedTaskIdx(0);
              return [2 /*return*/];
          }
        });
      });
    })();
  };
  var submitText = tasks.length > 1 ? 'Submit All' : 'Submit';
  return React.createElement(
    MuiPickersUtilsProvider,
    { utils: DateFnsUtils },
    React.createElement(
      Dialog,
      __assign({}, dialogProps, { maxWidth: 'md', fullWidth: tasks.length > 1 }),
      React.createElement(
        'form',
        null,
        React.createElement(
          DialogTitle,
          null,
          React.createElement(FormToolbar, { onSelectFileClick: handleSelectFileClick }),
        ),
        React.createElement(Divider, null),
        React.createElement(
          DialogContent,
          null,
          React.createElement(
            Grid,
            { container: true, direction: 'row', wrap: 'nowrap' },
            React.createElement(
              Grid,
              null,
              React.createElement(
                TextField,
                {
                  select: true,
                  id: 'task-type',
                  label: 'Task Type',
                  variant: 'outlined',
                  fullWidth: true,
                  margin: 'normal',
                  value: task.task_type !== -1 ? task.task_type : '',
                  onChange: handleTaskTypeChange,
                },
                React.createElement(MenuItem, { value: RmfModels.TaskType.TYPE_CLEAN }, 'Clean'),
                React.createElement(MenuItem, { value: RmfModels.TaskType.TYPE_LOOP }, 'Loop'),
                React.createElement(
                  MenuItem,
                  { value: RmfModels.TaskType.TYPE_DELIVERY },
                  'Delivery',
                ),
              ),
              React.createElement(
                Grid,
                { container: true, wrap: 'nowrap' },
                React.createElement(
                  Grid,
                  { style: { flexGrow: 1 } },
                  React.createElement(KeyboardDateTimePicker, {
                    id: 'start-time',
                    value: new Date(task.start_time * 1000),
                    onChange: function (date) {
                      if (!date) {
                        return;
                      }
                      // FIXME: needed because dateio typings default to moment
                      task.start_time = Math.floor(date.getTime() / 1000);
                      updateTasks();
                    },
                    label: 'Start Time',
                    margin: 'normal',
                    fullWidth: true,
                  }),
                ),
                React.createElement(
                  Grid,
                  {
                    style: {
                      flex: '0 1 5em',
                      marginLeft: theme.spacing(2),
                      marginRight: theme.spacing(2),
                    },
                  },
                  React.createElement(TextField, {
                    id: 'priority',
                    type: 'number',
                    label: 'Priority',
                    margin: 'normal',
                    value: priorityInput,
                    onChange: function (ev) {
                      task.priority = parseInt(ev.target.value) || 0;
                      updateTasks();
                      setPriorityInput(ev.target.value);
                    },
                  }),
                ),
              ),
              renderTaskDescriptionForm(),
            ),
            taskTitles.length > 1 &&
              React.createElement(
                React.Fragment,
                null,
                React.createElement(Divider, {
                  orientation: 'vertical',
                  flexItem: true,
                  style: { marginLeft: theme.spacing(2), marginRight: theme.spacing(2) },
                }),
                React.createElement(
                  List,
                  { dense: true, className: classes.taskList, 'aria-label': 'Tasks List' },
                  taskTitles.map(function (title, idx) {
                    return React.createElement(
                      ListItem,
                      {
                        key: idx,
                        button: true,
                        onClick: function () {
                          return setSelectedTaskIdx(idx);
                        },
                        className: selectedTaskIdx === idx ? classes.selectedTask : undefined,
                        role: 'listitem button',
                      },
                      React.createElement(ListItemText, { primary: title }),
                    );
                  }),
                ),
              ),
          ),
        ),
        React.createElement(Divider, null),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            {
              variant: 'contained',
              color: 'primary',
              disabled: submitting,
              onClick: onCancelClick,
              'aria-label': 'Cancel',
            },
            'Cancel',
          ),
          React.createElement(
            Button,
            {
              style: { margin: theme.spacing(1) },
              type: 'submit',
              variant: 'contained',
              color: 'primary',
              disabled: submitting,
              onClick: handleSubmit,
              'aria-label': submitText,
            },
            React.createElement(
              Typography,
              { style: { visibility: submitting ? 'hidden' : 'visible' }, variant: 'button' },
              submitText,
            ),
            React.createElement(CircularProgress, {
              style: { position: 'absolute', visibility: submitting ? 'visible' : 'hidden' },
              color: 'inherit',
              size: '1.8em',
            }),
          ),
        ),
      ),
    ),
  );
}
