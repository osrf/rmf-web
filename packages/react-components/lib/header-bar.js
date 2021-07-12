import React from 'react';
import { createStyles, makeStyles, AppBar } from '@material-ui/core';
var useStyles = makeStyles(function () {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
  });
});
export var HeaderBar = function (props) {
  var children = props.children;
  var classes = useStyles();
  return React.createElement(
    AppBar,
    { id: 'appbar', position: 'static', className: classes.root },
    children,
  );
};
