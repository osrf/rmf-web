import React from 'react';
import Debug from 'debug';
import * as RmfModels from 'rmf-models';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { SimpleInfo } from '../simple-info';
import { formatStatus, getActorFromStatus, getStateLabel } from './task-summary-utils';
var debug = Debug('Tasks:TaskSummaryAccordion');
export var TaskSummaryAccordionInfo = function (props) {
  var task = props.task;
  var statusDetails = formatStatus(task.status);
  var stateLabel = getStateLabel(task.state);
  var classes = useStylesAccordionItems();
  var data = [
    { name: 'TaskId', value: task.task_id, wrap: true },
    { name: 'State', value: stateLabel },
    {
      name: 'Status',
      value: statusDetails,
      className: {
        overrideValue: classes.overrideValue,
        overrideArrayItemValue: classes.overrideArrayItemValue,
      },
    },
    { name: 'Subm. Time', value: task.submission_time.sec },
    { name: 'Start time', value: task.start_time.sec },
    { name: 'End Time', value: task.end_time.sec },
  ];
  return React.createElement(SimpleInfo, {
    infoData: data,
    overrideStyle: { container: classes.overrideContainer },
  });
};
export var TaskSummaryAccordion = React.memo(function (props) {
  debug('task summary status panel render');
  var tasks = props.tasks;
  var classes = useStyles();
  var _a = React.useState([]),
    expanded = _a[0],
    setExpanded = _a[1];
  var _b = React.useState(''),
    selected = _b[0],
    setSelected = _b[1];
  var handleToggle = function (event, nodeIds) {
    setExpanded(nodeIds);
  };
  var handleSelect = function (event, nodeIds) {
    setSelected(nodeIds);
  };
  var determineStyle = function (state) {
    switch (state) {
      case RmfModels.TaskSummary.STATE_QUEUED:
        return classes.queued;
      case RmfModels.TaskSummary.STATE_ACTIVE:
        return classes.active;
      case RmfModels.TaskSummary.STATE_COMPLETED:
        return classes.completed;
      case RmfModels.TaskSummary.STATE_FAILED:
        return classes.failed;
      default:
        return 'UNKNOWN';
    }
  };
  var renderActor = function (taskStatus) {
    var actor = getActorFromStatus(taskStatus);
    if (!actor) return null;
    return React.createElement(
      Typography,
      { variant: 'body1', id: 'task-actor', className: classes.taskActor },
      actor,
    );
  };
  var renderTaskTreeItem = function (task) {
    return React.createElement(
      TreeItem,
      {
        role: 'treeitem',
        nodeId: task.task_id,
        key: task.task_id,
        classes: {
          label: determineStyle(task.state) + ' ' + classes.labelContent,
          root: classes.treeChildren,
          expanded: classes.expanded,
        },
        label: React.createElement(
          React.Fragment,
          null,
          React.createElement(
            Typography,
            { variant: 'body1', noWrap: true },
            task.state === RmfModels.TaskSummary.STATE_ACTIVE &&
              // TODO: add onClick with e.preventDefault() and with the pause plans logic.
              React.createElement(
                IconButton,
                { disabled: true },
                React.createElement(PlayCircleFilledWhiteIcon, null),
              ),
            task.state === RmfModels.TaskSummary.STATE_QUEUED &&
              React.createElement(
                IconButton,
                { disabled: true },
                React.createElement(PauseCircleFilledIcon, null),
              ),
            task.task_id,
          ),
          renderActor(task.status),
        ),
      },
      React.createElement(TaskSummaryAccordionInfo, { task: task, key: task.task_id }),
    );
  };
  return React.createElement(
    TreeView,
    {
      className: classes.root,
      onNodeSelect: handleSelect,
      onNodeToggle: handleToggle,
      defaultCollapseIcon: React.createElement(ExpandMoreIcon, null),
      defaultExpanded: ['root'],
      defaultExpandIcon: React.createElement(ChevronRightIcon, null),
      expanded: expanded,
      selected: selected,
    },
    tasks.map(function (task) {
      return renderTaskTreeItem(task);
    }),
  );
});
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      padding: '1rem',
    },
    accordionDetailLine: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(0.5),
    },
    treeChildren: {
      margin: '0.5rem 0',
    },
    labelContent: {
      padding: '0.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 0 25px 0 rgb(72, 94, 116, 0.3)',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    expanded: {
      borderLeft: '0.1rem solid #cccccc',
    },
    /**
     * The idea is to maintain the same itemTree color depending on the task state even on selected.
     * There are two styles API provided by the material-ui Tree library: `selected` and `label`.
     * On a item select the library creates a class called `selected` that has precedence over the
     * classes we could add using the API. So to override the background color of the `selected`
     * we added `!important` to our custom styles that manage background color of the item tree.
     */
    completed: {
      backgroundColor: '#4E5453 !important',
    },
    queued: {
      backgroundColor: theme.palette.warning.main + '!important',
    },
    active: {
      backgroundColor: theme.palette.success.light + '!important',
    },
    failed: {
      backgroundColor: theme.palette.error.main + '!important',
    },
    taskActor: {
      alignSelf: 'center',
    },
  };
});
var useStylesAccordionItems = makeStyles(function (theme) {
  return {
    overrideArrayItemValue: {
      textAlign: 'center',
    },
    overrideContainer: {
      borderCollapse: 'collapse',
      width: '100%',
      overflowX: 'auto',
    },
    overrideValue: {
      display: 'table-cell',
      textAlign: 'end',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      borderTop: '1px solid',
      borderTopColor: theme.palette.divider,
    },
  };
});
export default TaskSummaryAccordion;
