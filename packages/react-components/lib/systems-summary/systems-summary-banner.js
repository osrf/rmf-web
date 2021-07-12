import React from 'react';
import { makeStyles, Typography, Card, CardHeader, Avatar } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
  return {
    heading: {
      color: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    noError: {
      backgroundColor: theme.palette.success.main,
    },
    error: {
      backgroundColor: theme.palette.warning.main,
    },
    cardHeader: {
      backgroundColor: theme.palette.grey[100],
    },
  };
});
export var SystemSummaryBanner = function (props) {
  var classes = useStyles();
  var imageSrc = props.imageSrc,
    isError = props.isError;
  var getStatusLabel = function () {
    return isError
      ? classes.heading + ' ' + classes.error
      : classes.heading + ' ' + classes.noError;
  };
  return React.createElement(
    Card,
    null,
    React.createElement(
      Typography,
      { className: getStatusLabel(), align: 'center', variant: 'h6' },
      'Rmf Systems Panel',
    ),
    React.createElement(CardHeader, {
      className: classes.cardHeader,
      avatar: imageSrc ? React.createElement(Avatar, { alt: 'Romi-H logo', src: imageSrc }) : null,
      title: React.createElement(Typography, { variant: 'body1' }, 'Rmf Systems'),
      subheader: React.createElement(
        Typography,
        { variant: 'body2' },
        'Summary of equipment states',
      ),
    }),
  );
};
