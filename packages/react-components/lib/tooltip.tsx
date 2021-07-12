import { makeStyles, Tooltip as MuiTooltip } from '@material-ui/core';
import React from 'react';

export interface TooltipProps {
  title: string;
  id: string;
  enabled: boolean; //this prop allows you to enabled / disable the use of tooltips
  children: JSX.Element;
}

const useStyles = makeStyles({
  tooltipWidth: {
    maxWidth: 200,
  },
});

export const Tooltip = (props: TooltipProps): JSX.Element => {
  const { title, id, enabled } = props;
  const classes = useStyles();
  return (
    <div>
      {enabled && (
        <MuiTooltip
          title={title}
          arrow
          id={id}
          className={classes.tooltipWidth}
          data-testid={id + '-tooltip'}
        >
          {props.children}
        </MuiTooltip>
      )}
      {!enabled && props.children}
    </div>
  );
};

export default Tooltip;
