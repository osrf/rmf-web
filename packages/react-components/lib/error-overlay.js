import React from 'react';
import { makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography, Grid } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
  return {
    errorIcon: {
      color: theme.palette.error.main,
      fontSize: '2rem',
    },
    errorMsg: {
      margin: '0.5rem',
    },
    errorDisabled: {
      pointerEvents: 'none',
      filter: 'blur(.25rem)',
      gridArea: '1 / 1',
      opacity: 0.6,
    },
    overlay: {
      gridArea: '1 / 1',
      backdropFilter: 'blur(.5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'grid',
    },
    disableSelect: {
      userSelect: 'none',
    },
  };
});
export var ErrorOverlay = React.memo(function (props) {
  var classes = useStyles();
  var errorMsg = props.errorMsg,
    children = props.children,
    overrideErrorStyle = props.overrideErrorStyle;
  return errorMsg
    ? React.createElement(
        'div',
        { className: classes.container },
        React.createElement('div', { className: classes.errorDisabled }, children),
        React.createElement(
          'div',
          {
            className: children
              ? classes.overlay + ' ' + classes.disableSelect
              : classes.disableSelect,
          },
          React.createElement(
            'div',
            null,
            React.createElement(
              Grid,
              {
                container: true,
                direction: 'row',
                justify: 'center',
                alignItems: 'center',
                spacing: 2,
              },
              React.createElement(
                Grid,
                { item: true },
                React.createElement(ErrorIcon, { className: classes.errorIcon }),
              ),
              React.createElement(
                Grid,
                { item: true },
                React.createElement(
                  Typography,
                  { color: 'error', variant: 'h4', align: 'center' },
                  'Error',
                ),
              ),
            ),
            React.createElement(
              Typography,
              {
                className: overrideErrorStyle ? overrideErrorStyle : classes.errorMsg,
                color: 'error',
                variant: 'h6',
                align: 'center',
              },
              errorMsg,
            ),
          ),
        ),
      )
    : React.createElement(React.Fragment, null, children);
});
