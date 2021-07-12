import React from 'react';
import { Button, createStyles, makeStyles } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
  return createStyles({
    root: {
      '&$disabled': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
    },
    disabled: {},
    logo: {
      maxWidth: 120,
      opacity: 1,
    },
  });
});
export var LogoButton = function (props) {
  var logoPath = props.logoPath,
    onClick = props.onClick;
  var classes = useStyles();
  if (onClick) {
    return React.createElement(
      Button,
      { disableElevation: true, color: 'primary', variant: 'contained', onClick: onClick },
      React.createElement('img', { src: logoPath, style: { width: '120px' }, alt: 'logo' }),
    );
  } else {
    return React.createElement(
      Button,
      {
        disableElevation: true,
        color: 'primary',
        variant: 'contained',
        classes: {
          root: classes.root,
          disabled: classes.disabled,
        },
        disabled: true,
      },
      React.createElement('img', { src: logoPath, style: { width: '120px' }, alt: 'logo' }),
    );
  }
};
