import { createStyles, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
var useStyles = makeStyles(function () {
  return createStyles({
    tabsContainer: {
      borderRight: '0.25px solid rgba(251, 252, 255, 0.5)',
      borderLeft: '0.25px solid rgba(251, 252, 255, 0.5)',
      flexGrow: 4,
    },
  });
});
export var NavigationBar = function (props) {
  var value = props.value,
    onTabChange = props.onTabChange,
    children = props.children;
  var classes = useStyles();
  return React.createElement(
    Tabs,
    {
      variant: 'scrollable',
      scrollButtons: 'auto',
      value: value,
      onChange: onTabChange,
      className: classes.tabsContainer,
    },
    children,
  );
};
