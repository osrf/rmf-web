import { makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
var useStyles = makeStyles({
  tooltipWidth: {
    maxWidth: 200,
  },
});
export var DashboardTooltip = function (props) {
  var title = props.title,
    id = props.id,
    enabled = props.enabled;
  var classes = useStyles();
  return React.createElement(
    'div',
    null,
    enabled &&
      React.createElement(
        Tooltip,
        {
          title: title,
          arrow: true,
          id: id,
          className: classes.tooltipWidth,
          'data-testid': id + '-tooltip',
        },
        props.children,
      ),
    !enabled && props.children,
  );
};
export default DashboardTooltip;
