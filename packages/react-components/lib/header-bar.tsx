import React from 'react';
import { createStyles, makeStyles, AppBar } from '@material-ui/core';

interface HeaderBarProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
  }),
);

export const HeaderBar = (props: HeaderBarProps): React.ReactElement => {
  const { children } = props;
  const classes = useStyles();

  return (
    <AppBar id="appbar" position="static" className={classes.root}>
      {children}
    </AppBar>
  );
};
