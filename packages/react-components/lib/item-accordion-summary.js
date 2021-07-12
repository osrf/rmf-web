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
import { makeStyles } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { joinClasses } from './css-utils';
import { StatusLabel } from './status-label';
var useStyles = makeStyles({
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  hideText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
export var ItemAccordionSummary = function (props) {
  var classes_ = useStyles();
  var title = props.title,
    classes = props.classes,
    statusProps = props.statusProps;
  return React.createElement(
    AccordionSummary,
    {
      classes: { content: classes_.content },
      expandIcon: React.createElement(ExpandMoreIcon, null),
    },
    React.createElement(
      Typography,
      {
        variant: 'h6',
        className: joinClasses(
          classes_.hideText,
          classes === null || classes === void 0 ? void 0 : classes.title,
        ),
      },
      title,
    ),
    React.createElement(StatusLabel, __assign({}, statusProps)),
  );
};
export default ItemAccordionSummary;
