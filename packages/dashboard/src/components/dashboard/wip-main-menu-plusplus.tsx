import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import Debug from 'debug';
import React from 'react';
import {
  Notification,
  RobotSummaryState,
  SystemSummaryAlert,
  SystemSummaryBanner,
  SystemSummaryItemState,
  SystemSummarySpoiltItems,
  SystemSummaryTaskState,
  Tooltip,
} from 'react-components';
import * as RmfModels from 'rmf-models';
import { HealthStatus } from '../../managers/rmf-health-state-manager';
import { TooltipsContext } from '../app-contexts';
import { RmfHealthContext } from '../rmf-app';
import { OmniPanelViewIndex } from './dashboard';

const debug = Debug('MainMenu');

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  buttons: {
    width: '100%',
    margin: '0.5rem 0',
  },
  commandButton: {
    backgroundColor: theme.palette.warning.dark,
    color: 'white',
  },
  divider: {
    margin: '0.5rem 0',
  },
  systemSummaryHeader: {
    margin: '0.5rem 0',
  },
}));

export interface MainMenuProps {
  pushView(view: OmniPanelViewIndex): void;
  tasks: RmfModels.TaskSummary[];
  notifications: Notification[];
  spoiltDoorClick?(door: RmfModels.Door): void;
  spoiltLiftClick?(lift: RmfModels.Lift): void;
  spoiltRobotClick?(fleet: string, robot: RmfModels.RobotState): void;
  spoiltDispenserClick?(guid: string): void;
  /**
   * resets the filter term once called
   */
  setFilter?: () => void;
}

export const MainMenu = React.memo((props: MainMenuProps) => {
  const { showTooltips } = React.useContext(TooltipsContext);
  const {
    pushView,
    tasks,
    notifications,
    spoiltDispenserClick,
    spoiltDoorClick,
    spoiltLiftClick,
    spoiltRobotClick,
    setFilter,
  } = props;
  debug('render');
  const classes = useStyles();

  const handleMainMenuDoorsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Doors);
    setFilter && setFilter();
  }, [pushView, setFilter]);

  const handleMainMenuLiftsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Lifts);
    setFilter && setFilter();
  }, [pushView, setFilter]);

  const handleMainMenuRobotsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Robots);
    setFilter && setFilter();
  }, [pushView, setFilter]);

  const handleMainMenuDispensersClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Dispensers);
    setFilter && setFilter();
  }, [pushView, setFilter]);

  const handleMainMenuNegotiationsClick = React.useCallback(() => {
    pushView(OmniPanelViewIndex.Negotiations);
    setFilter && setFilter();
  }, [pushView, setFilter]);

  const [allNotifications, setAllNotifications] = React.useState(notifications);

  const handleDismissNotification = (id: number) => {
    const filteredNotifications = allNotifications.filter((n) => n.id !== id);
    setAllNotifications(filteredNotifications);
  };

  const bannerIsError = (healthStatus: HealthStatus): boolean => {
    let doorCount = healthStatus.door.spoiltItem.length;
    let liftCount = healthStatus.lift.spoiltItem.length;
    let dispenserCount = healthStatus.dispenser.spoiltItem.length;
    let robotCount = healthStatus.robot.spoiltRobots.length;

    return doorCount + liftCount + dispenserCount + robotCount !== 0;
  };

  const healthStatus = React.useContext(RmfHealthContext);

  return (
    <React.Fragment>
      <SystemSummaryBanner imageSrc={'/favicon.ico'} isError={bannerIsError(healthStatus)} />
      <div className={classes.root}>
        <SystemSummaryAlert
          notifications={allNotifications}
          onNotificationsDismiss={handleDismissNotification}
        />
        <Divider className={classes.divider} />

        <SystemSummarySpoiltItems
          doors={healthStatus.door.spoiltItem}
          lifts={healthStatus.lift.spoiltItem}
          dispensers={healthStatus.dispenser.spoiltItem}
          robots={healthStatus.robot.spoiltRobots}
          onClickSpoiltDoor={spoiltDoorClick}
          onClickSpoiltDispenser={spoiltDispenserClick}
          onClickSpoiltLift={spoiltLiftClick}
          onClickSpoiltRobot={spoiltRobotClick}
        />
        <Divider className={classes.divider} />

        <Typography variant="h5" className={classes.systemSummaryHeader}>
          Systems Summary
        </Typography>

        <SystemSummaryItemState
          item={'Door'}
          itemSummary={healthStatus.door}
          onClick={handleMainMenuDoorsClick}
        />
        <SystemSummaryItemState
          item={'Lift'}
          itemSummary={healthStatus.lift}
          onClick={handleMainMenuLiftsClick}
        />
        <SystemSummaryItemState
          item={'Dispenser'}
          itemSummary={healthStatus.dispenser}
          onClick={handleMainMenuDispensersClick}
        />
        <RobotSummaryState
          item={'Robot'}
          robotSummary={healthStatus.robot}
          onClick={handleMainMenuRobotsClick}
        />
        <Divider className={classes.divider} />

        <Typography variant="h6">Task Statuses</Typography>
        <SystemSummaryTaskState tasks={tasks} />
        <Button
          color="primary"
          className={classes.buttons}
          variant="contained"
          onClick={handleMainMenuNegotiationsClick}
        >
          <Tooltip
            title="This panel shows the negotiations between robots when there are conflicts in trajectories"
            id="negotiations-tooltip"
            enabled={showTooltips}
          >
            <Typography variant="body1">Negotiations</Typography>
          </Tooltip>
        </Button>
        <Button color="primary" className={classes.buttons} variant="contained">
          <Tooltip
            title="This panel shows the plans of robots that has received instructions to perform a task"
            id="plans-tooltip"
            enabled={showTooltips}
          >
            <Typography variant="body1">Plans</Typography>
          </Tooltip>
        </Button>
        <Divider className={classes.divider} />
      </div>
    </React.Fragment>
  );
});

export default MainMenu;
