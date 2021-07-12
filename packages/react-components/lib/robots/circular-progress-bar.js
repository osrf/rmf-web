import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { createStyles, makeStyles } from '@material-ui/core';
var useStyles = makeStyles(function () {
  return createStyles({
    indicator: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      margin: '0 auto',
    },
  });
});
export function CircularProgressBar(props) {
  var progress = props.progress,
    strokeColor = props.strokeColor,
    children = props.children;
  var classes = useStyles();
  return React.createElement(
    ProgressBar,
    {
      radius: 60,
      progress: progress,
      cut: 120,
      rotate: -210,
      strokeColor: strokeColor,
      strokeWidth: 10,
      trackStrokeWidth: 10,
    },
    React.createElement('div', { className: classes.indicator }, children),
  );
}
