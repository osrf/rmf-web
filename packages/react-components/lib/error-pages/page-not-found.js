import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
export var NotFoundPage = function (props) {
  var routeLinkComponent = props.routeLinkComponent;
  var classes = useStyles();
  console.warn('Photo by Aron Visuals on Unsplash');
  return React.createElement(
    'div',
    { className: classes.div },
    React.createElement('img', {
      className: classes.img,
      src: 'assets/aron-visuals-3jBU9TbKW7o-unsplash.jpg',
      alt: '404 Not Found',
    }),
    React.createElement(
      Typography,
      { variant: 'h1', component: 'h2', gutterBottom: true, className: classes.text },
      'Are you lost? ',
      routeLinkComponent,
    ),
    React.createElement(
      Typography,
      { className: classes.author },
      'Photo by Aron Visuals on Unsplash',
    ),
  );
};
var useStyles = makeStyles(function () {
  return {
    div: {
      width: '100%',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
    },
    text: {
      position: 'fixed',
      left: '20%',
      top: '2%',
      color: 'white',
      fontWeight: 'bold',
    },
    author: {
      position: 'fixed',
      right: '5%',
      bottom: '2%',
      color: 'white',
    },
  };
});
export default NotFoundPage;
