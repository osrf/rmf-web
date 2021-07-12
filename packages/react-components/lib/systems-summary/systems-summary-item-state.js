import React from 'react';
import { makeStyles, Typography, Grid, Paper, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
var useStyles = makeStyles(function (theme) {
  return {
    paper: {
      padding: theme.spacing(0.2),
    },
    warning: {
      color: theme.palette.error.main,
      border: '2px solid ' + theme.palette.error.main,
    },
    operational: {
      color: theme.palette.success.main,
      border: '2px solid ' + theme.palette.success.main,
    },
    headerGrid: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      padding: 0,
    },
  };
});
export var SystemSummaryItemState = function (props) {
  var classes = useStyles();
  var item = props.item,
    itemSummary = props.itemSummary,
    onClick = props.onClick;
  var totalItem = itemSummary.operational + itemSummary.spoiltItem.length;
  var operationalItem = itemSummary.operational;
  var getOperationalStatusLabel = function (total, operational) {
    if (total === operational) {
      return classes.paper + ' ' + classes.operational;
    } else {
      return classes.paper + ' ' + classes.warning;
    }
  };
  return React.createElement(
    Grid,
    { container: true, spacing: 1, direction: 'column' },
    React.createElement(
      Grid,
      { item: true, className: classes.headerGrid },
      React.createElement(Typography, { variant: 'h6' }, item),
      React.createElement(
        Button,
        { className: classes.button, disabled: !onClick, onClick: onClick },
        React.createElement(Typography, { variant: 'h6' }, 'Details '),
        React.createElement(NavigateNextIcon, null),
      ),
    ),
    React.createElement(
      Grid,
      { item: true },
      React.createElement(
        Grid,
        { container: true, justify: 'flex-start', direction: 'row' },
        React.createElement(
          Grid,
          { item: true, xs: 12 },
          React.createElement(
            Paper,
            { className: getOperationalStatusLabel(totalItem, operationalItem), elevation: 3 },
            React.createElement(
              Typography,
              { noWrap: true, align: 'center', variant: 'h6', 'aria-label': item + '-operational' },
              operationalItem + '/' + totalItem,
            ),
            React.createElement(Typography, { align: 'center', variant: 'body1' }, 'Operational'),
          ),
        ),
      ),
    ),
  );
};
