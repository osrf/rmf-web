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
import { Box, Grid, makeStyles, Tooltip, Typography, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import * as RmfModels from 'rmf-models';
var getPhaseColors = function (theme) {
  return {
    pending: theme.palette.background.paper,
    completed: theme.palette.success.light,
    failed: theme.palette.error.light,
  };
};
var useStyles = makeStyles(function (theme) {
  var phaseColors = getPhaseColors(theme);
  return {
    taskPhasesContainer: {
      overflowX: 'auto',
    },
    taskPhase: {
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      flex: '1 1 0',
      minWidth: 100,
    },
    pendingPhase: {
      background: phaseColors.pending,
    },
    completedPhase: {
      background: phaseColors.completed,
    },
    failedPhase: {
      background: phaseColors.failed,
    },
    phaseSeparator: {
      position: 'relative',
      left: theme.spacing(-1),
      margin: '0 ' + theme.spacing(-2) + 'px 0 0',
    },
    phaseStatus: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  };
});
function Phase(_a) {
  var status = _a.status,
    divProps = __rest(_a, ['status']);
  var classes = useStyles();
  var lines = status.split('\n');
  return React.createElement(
    'div',
    __assign({}, divProps),
    lines.map(function (l, idx) {
      return React.createElement(
        Tooltip,
        { key: idx, title: l },
        React.createElement(
          Typography,
          { key: idx, className: classes.phaseStatus, variant: 'caption' },
          l,
        ),
      );
    }),
  );
}
function PhaseSeparator(_a) {
  var leftColor = _a.leftColor,
    rightColor = _a.rightColor;
  var classes = useStyles();
  return React.createElement(
    'div',
    { className: classes.phaseSeparator },
    React.createElement(
      'svg',
      {
        viewBox: '-0.05 -0.05 1.1 1.1',
        width: '50px',
        height: '100%',
        preserveAspectRatio: 'none',
      },
      React.createElement('polygon', {
        points: '0,0 0.1,0 0.4,0.5, 0.1,1 0,1',
        strokeLinejoin: 'round',
        strokeWidth: 0.1,
        stroke: leftColor,
        fill: leftColor,
      }),
      React.createElement('polygon', {
        points: '0.4,0 1,0, 1,1 0.4,1 0.7,0.5',
        strokeLinejoin: 'round',
        strokeWidth: 0.1,
        stroke: rightColor,
        fill: rightColor,
      }),
    ),
  );
}
export function TaskPhases(_a) {
  var taskSummary = _a.taskSummary;
  var classes = useStyles();
  var theme = useTheme();
  var phaseColors = getPhaseColors(theme);
  var phases = taskSummary.status.split('\n\n');
  var currentPhaseIdx = phases.findIndex(function (msg) {
    return msg.startsWith('*');
  });
  // probably don't need to memo for now because almost all renders will change its
  // dependencies.
  var phaseProps = phases.map(function (_, idx) {
    if (
      [RmfModels.TaskSummary.STATE_CANCELED, RmfModels.TaskSummary.STATE_FAILED].includes(
        taskSummary.state,
      )
    ) {
      return {
        className: classes.failedPhase,
        color: phaseColors.failed,
      };
    }
    if (taskSummary.state === RmfModels.TaskSummary.STATE_COMPLETED) {
      return {
        className: classes.completedPhase,
        color: phaseColors.completed,
      };
    }
    if (taskSummary.state === RmfModels.TaskSummary.STATE_ACTIVE && idx < currentPhaseIdx) {
      return {
        className: classes.completedPhase,
        color: phaseColors.completed,
      };
    }
    return {
      className: classes.pendingPhase,
      color: phaseColors.pending,
    };
  });
  return React.createElement(
    Box,
    null,
    React.createElement(
      Grid,
      { container: true, wrap: 'nowrap', className: classes.taskPhasesContainer },
      phases.map(function (phase, idx) {
        return React.createElement(
          React.Fragment,
          { key: idx },
          React.createElement(Phase, {
            status: phase,
            className: clsx(classes.taskPhase, phaseProps[idx].className),
          }),
          idx != phases.length - 1 &&
            React.createElement(PhaseSeparator, {
              leftColor: phaseProps[idx].color,
              rightColor: phaseProps[idx + 1].color,
            }),
        );
      }),
    ),
  );
}
