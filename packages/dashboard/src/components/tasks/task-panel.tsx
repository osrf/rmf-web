import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  TableContainer,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  AddOutlined as AddOutlinedIcon,
  Autorenew as AutorenewIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import { Alert, AlertProps } from '@material-ui/lab';
import type { SubmitTask } from 'api-client';
import React from 'react';
import { CreateTaskForm, CreateTaskFormProps, TaskInfo, TaskTable } from 'react-components';
import * as RmfModels from 'rmf-models';
import { UserContext } from '../auth/contexts';
import { canSubmitTask } from '../permissions';
import { parseTasksFile } from './utils';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableTitle: {
    flex: '1 1 100%',
  },
  detailPanelContainer: {
    width: 350,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    flex: '0 0 auto',
  },
  enabledToggleButton: {
    background: theme.palette.action.selected,
  },
}));

function NoSelectedTask() {
  return (
    <Grid container wrap="nowrap" alignItems="center" style={{ height: '100%' }}>
      <Typography variant="h6" align="center" color="textSecondary">
        Click on a task to view more information
      </Typography>
    </Grid>
  );
}

export interface FetchTasksResult {
  tasks: RmfModels.TaskSummary[];
  totalCount: number;
}

export interface TaskPanelProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Should only contain the tasks of the current page.
   */
  tasks: RmfModels.TaskSummary[];
  paginationOptions?: Omit<React.ComponentPropsWithoutRef<typeof TablePagination>, 'component'>;
  cleaningZones?: string[];
  loopWaypoints?: string[];
  deliveryWaypoints?: string[];
  dispensers?: string[];
  ingestors?: string[];
  submitTasks?: CreateTaskFormProps['submitTasks'];
  cancelTask?: (task: RmfModels.TaskSummary) => Promise<void>;
  onRefresh?: () => void;
  onAutoRefresh?: (enabled: boolean) => void;
}

export function TaskPanel({
  tasks,
  paginationOptions,
  cleaningZones,
  loopWaypoints,
  deliveryWaypoints,
  dispensers,
  ingestors,
  submitTasks,
  cancelTask,
  onRefresh,
  onAutoRefresh,
  ...divProps
}: TaskPanelProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedTask, setSelectedTask] = React.useState<RmfModels.TaskSummary | undefined>(
    undefined,
  );
  const uploadFileInputRef = React.useRef<HTMLInputElement>(null);
  const [openCreateTaskForm, setOpenCreateTaskForm] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<AlertProps['severity']>('success');
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const user = React.useContext(UserContext);

  const handleCancelTaskClick = React.useCallback<React.MouseEventHandler>(async () => {
    if (!cancelTask || !selectedTask) {
      return;
    }
    try {
      await cancelTask(selectedTask);
      setSnackbarMessage('Successfully cancelled task');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setSelectedTask(undefined);
    } catch (e) {
      setSnackbarMessage(`Failed to cancel task: ${e.message}`);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [cancelTask, selectedTask]);

  /* istanbul ignore next */
  const tasksFromFile = (): Promise<SubmitTask[]> => {
    return new Promise((res) => {
      const fileInputEl = uploadFileInputRef.current;
      if (!fileInputEl) {
        return [];
      }
      const listener = async () => {
        try {
          if (!fileInputEl.files || fileInputEl.files.length === 0) {
            return res([]);
          }
          return res(parseTasksFile(await fileInputEl.files[0].text()));
        } finally {
          fileInputEl.removeEventListener('input', listener);
          fileInputEl.value = '';
        }
      };
      fileInputEl.addEventListener('input', listener);
      fileInputEl.click();
    });
  };

  const autoRefreshTooltipPrefix = autoRefresh ? 'Disable' : 'Enable';

  const taskCancellable =
    selectedTask &&
    (selectedTask.state === RmfModels.TaskSummary.STATE_ACTIVE ||
      selectedTask.state === RmfModels.TaskSummary.STATE_PENDING ||
      selectedTask.state === RmfModels.TaskSummary.STATE_QUEUED);

  return (
    <div {...divProps}>
      <Grid container wrap="nowrap" justify="center" style={{ height: 'inherit' }}>
        <Paper className={classes.tableContainer}>
          <Toolbar>
            <Typography className={classes.tableTitle} variant="h6">
              Tasks
            </Typography>
            <Tooltip title={`${autoRefreshTooltipPrefix} auto refresh`}>
              <IconButton
                className={autoRefresh ? classes.enabledToggleButton : undefined}
                onClick={() => {
                  setAutoRefresh((prev) => !prev);
                  onAutoRefresh && onAutoRefresh(!autoRefresh);
                }}
                aria-label={`${autoRefreshTooltipPrefix} auto refresh`}
              >
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refersh">
              <IconButton onClick={() => onRefresh && onRefresh()} aria-label="Refresh">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            {user && canSubmitTask(user) && (
              <Tooltip title="Create task">
                <IconButton onClick={() => setOpenCreateTaskForm(true)} aria-label="Create Task">
                  <AddOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <TableContainer>
            <TaskTable tasks={tasks} onTaskClick={(_ev, task) => setSelectedTask(task)} />
          </TableContainer>
          {paginationOptions && (
            <TablePagination component="div" {...paginationOptions} style={{ flex: '0 0 auto' }} />
          )}
        </Paper>
        <Paper className={classes.detailPanelContainer}>
          {selectedTask ? (
            <>
              <TaskInfo task={selectedTask} />
              <Button
                style={{ marginTop: theme.spacing(1) }}
                fullWidth
                variant="contained"
                color="secondary"
                aria-label="Cancel Task"
                disabled={!taskCancellable}
                onClick={handleCancelTaskClick}
              >
                Cancel Task
              </Button>
            </>
          ) : (
            <NoSelectedTask />
          )}
        </Paper>
      </Grid>
      {openCreateTaskForm && (
        <CreateTaskForm
          cleaningZones={cleaningZones}
          loopWaypoints={loopWaypoints}
          deliveryWaypoints={deliveryWaypoints}
          dispensers={dispensers}
          ingestors={ingestors}
          open={openCreateTaskForm}
          onClose={() => setOpenCreateTaskForm(false)}
          submitTasks={submitTasks}
          tasksFromFile={tasksFromFile}
          onCancelClick={() => setOpenCreateTaskForm(false)}
          onSuccess={() => {
            setOpenCreateTaskForm(false);
            setSnackbarSeverity('success');
            setSnackbarMessage('Successfully created task');
            setOpenSnackbar(true);
          }}
          onFail={(e) => {
            setSnackbarSeverity('error');
            setSnackbarMessage(`Failed to create task: ${e.message}`);
            setOpenSnackbar(true);
          }}
        />
      )}
      <input type="file" style={{ display: 'none' }} ref={uploadFileInputRef} />
      <Snackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} autoHideDuration={2000}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
}
