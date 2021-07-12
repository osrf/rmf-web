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
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
export function LinearProgressBar(props) {
  return React.createElement(
    Box,
    { display: 'flex', alignItems: 'center' },
    React.createElement(
      Box,
      { width: '100%', mr: 1 },
      React.createElement(LinearProgress, __assign({ variant: 'determinate' }, props)),
    ),
    React.createElement(
      Box,
      { minWidth: 35 },
      React.createElement(
        Typography,
        { variant: 'body2', color: 'textSecondary' },
        Math.floor(props.value) + '%',
      ),
    ),
  );
}
