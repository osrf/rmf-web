import { Divider, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import Debug from 'debug';
import React from 'react';
import DashboardTooltip from 'react-components/lib/tooltip';
import { TooltipsContext } from '../app-contexts';
import { OmniPanelViewIndex } from './dashboard';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const debug = Debug('MainMenu');

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
  online: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export interface MainMenuProps {
  pushView(view: OmniPanelViewIndex): void;
  severityDisplay: boolean;
}

export const MainMenu = React.memo((props: MainMenuProps) => {
  const { showTooltips } = React.useContext(TooltipsContext);
  const { pushView, severityDisplay } = props;
  debug('render');
  const classes = useStyles();
  const handleMainMenuStatusClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Status);
  }, [pushView]);

  const handleMainMenuDoorsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Doors);
  }, [pushView]);

  const handleMainMenuLiftsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Lifts);
  }, [pushView]);

  const handleMainMenuRobotsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Robots);
  }, [pushView]);

  const handleMainMenuDispensersClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Dispensers);
  }, [pushView]);

  const handleMainMenuCommandsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Commands);
  }, [pushView]);

  const handleMainMenuNegotiationsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Negotiations);
  }, [pushView]);

  const handleMainMenuTasksClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Tasks);
  }, [pushView]);

  return (
    <List className={classes.root} data-component="MainMenu">
      <ListItem
        className={classes.statusItem}
        data-item="Status"
        button={true}
        onClick={handleMainMenuStatusClick}
      >
        <Typography variant="h5">Status</Typography>
        <FiberManualRecordIcon
          fontSize="large"
          className={severityDisplay ? classes.online : classes.error}
        />
      </ListItem>
      <Divider />

      <ListItem data-item="Doors" button={true} onClick={handleMainMenuDoorsClick}>
        <Typography variant="h5">Doors</Typography>
      </ListItem>
      <Divider />

      <ListItem data-item="Lifts" button={true} onClick={handleMainMenuLiftsClick}>
        <Typography variant="h5">Lifts</Typography>
      </ListItem>
      <Divider />

      <ListItem data-item="Robots" button={true} onClick={handleMainMenuRobotsClick}>
        <Typography variant="h5">Robots</Typography>
      </ListItem>
      <Divider />

      <ListItem data-item="Dispensers" button={true} onClick={handleMainMenuDispensersClick}>
        <Typography variant="h5">Dispensers</Typography>
      </ListItem>
      <Divider />

      <ListItem data-item="Commands" button={true} onClick={handleMainMenuCommandsClick}>
        <DashboardTooltip
          title="This panel shows the commands that a user can request and RoMi will allocate the most suitable robot for the task"
          id="commands-tooltip"
          enabled={showTooltips}
        >
          <Typography variant="h5">Commands</Typography>
        </DashboardTooltip>
      </ListItem>
      <Divider />

      <ListItem data-item="Negotiations" button={true} onClick={handleMainMenuNegotiationsClick}>
        <DashboardTooltip
          title="This panel shows the negotiations between robots when there are conflicts in trajectories"
          id="negotiations-tooltip"
          enabled={showTooltips}
        >
          <Typography variant="h5">Negotiations</Typography>
        </DashboardTooltip>
      </ListItem>
      <Divider />

      <ListItem data-item="Plans" button={true} onClick={handleMainMenuTasksClick}>
        <Typography variant="h5">Plans</Typography>
      </ListItem>
      <Divider />
    </List>
  );
});

export default MainMenu;
