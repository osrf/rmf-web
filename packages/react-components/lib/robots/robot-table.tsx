import {
  IconButton,
  makeStyles,
  Paper,
  PaperProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { taskTypeToStr } from '../tasks/utils';
import { robotModeToString, VerboseRobot } from './utils';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
  },
  taskRowHover: {
    background: theme.palette.action.hover,
  },
  infoRow: {
    boxShadow: `${theme.shadows[1]}`,
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

interface RobotRowProps {
  robot: VerboseRobot;
  onClick: React.MouseEventHandler<HTMLTableRowElement>;
}

const returnLocationCells = (robot: VerboseRobot) => {
  const taskDescription = robot.tasks[0].task_summary.task_profile.description;
  switch (taskTypeToStr(taskDescription.task_type.type)) {
    case 'Loop':
      return (
        <>
          <TableCell>{taskDescription.loop.start_name}</TableCell>
          <TableCell>{taskDescription.loop.finish_name}</TableCell>
        </>
      );
    case 'Delivery':
      return (
        <>
          <TableCell>{taskDescription.delivery.pickup_place_name}</TableCell>
          <TableCell>{taskDescription.delivery.dropoff_place_name}</TableCell>
        </>
      );
    case 'Clean':
      return (
        <>
          <TableCell>NA</TableCell>
          <TableCell>{taskDescription.clean.start_waypoint}</TableCell>
        </>
      );
    default:
      return (
        <>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </>
      );
  }
};

function RobotRow({ robot, onClick }: RobotRowProps) {
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  if (robot.tasks.length === 0) {
    return (
      <>
        <TableRow
          className={clsx(classes.infoRow, hover && classes.taskRowHover)}
          onClick={onClick}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <TableCell>{robot.name}</TableCell>
          <TableCell>{'-'}</TableCell>
          <TableCell>{'-'}</TableCell>
          <TableCell>{'-'}</TableCell>
          <TableCell>{Math.round(robot.state.battery_percent)}%</TableCell>
          <TableCell>{robotModeToString(robot.state.mode)}</TableCell>
        </TableRow>
      </>
    );
  } else {
    return (
      <>
        <TableRow
          className={clsx(classes.infoRow, hover && classes.taskRowHover)}
          onClick={onClick}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <TableCell>{robot.name}</TableCell>
          {returnLocationCells(robot)}
          <TableCell>
            {robot.tasks
              ? `${
                  robot.tasks[0].task_summary.end_time.sec -
                  robot.tasks[0].task_summary.start_time.sec
                }s`
              : '-'}
          </TableCell>
          <TableCell>{Math.round(robot.state.battery_percent)}%</TableCell>
          <TableCell>{robotModeToString(robot.state.mode)}</TableCell>
        </TableRow>
      </>
    );
  }
}

export type PaginationOptions = Omit<
  React.ComponentPropsWithoutRef<typeof TablePagination>,
  'component'
>;

export interface RobotTableProps extends PaperProps {
  /**
   * The current list of robots to display, when pagination is enabled, this should only
   * contain the robots for the current page.
   */
  robots: VerboseRobot[];
  paginationOptions?: PaginationOptions;
  onRefreshClick?: React.MouseEventHandler<HTMLButtonElement>;
  // onRobotClickAndRefresh?(robot: VerboseRobot, ev?: React.MouseEvent<HTMLDivElement>): void;
  onRobotClick?(ev: React.MouseEvent<HTMLDivElement>, robot: VerboseRobot): void;
}

export function RobotTable({
  robots,
  paginationOptions,
  onRefreshClick,
  onRobotClick,
  ...paperProps
}: RobotTableProps): JSX.Element {
  const classes = useStyles();

  return (
    <Paper {...paperProps}>
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Robots
        </Typography>
        <IconButton onClick={onRefreshClick} aria-label="Refresh">
          <RefreshIcon />
        </IconButton>
      </Toolbar>
      <TableContainer style={{ flex: '1 1 auto' }}>
        <Table className={classes.table} stickyHeader size="small" style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell>Robot Name</TableCell>
              <TableCell>Start Location</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Active Task Duration</TableCell>
              <TableCell>Battery</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {robots &&
              robots.map((robot, robot_id) => (
                <RobotRow
                  key={robot_id}
                  robot={robot}
                  onClick={(ev) => {
                    onRobotClick && onRobotClick(ev, robot);
                  }}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginationOptions && (
        <TablePagination component="div" {...paginationOptions} style={{ flex: '0 0 auto' }} />
      )}
    </Paper>
  );
}
