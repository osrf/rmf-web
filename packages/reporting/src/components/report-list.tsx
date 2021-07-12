import React from 'react';
import AllLogsReport from './reports/all-logs-report';
import DispenserStateReportConfig from './reports/dispenser-state-report';
import DoorStateReportConfig from './reports/door-state-report';
import FleetStateReportConfig from './reports/fleet-state-report';
import HealthReportConfig from './reports/health-report';
import IngestorStateReportConfig from './reports/ingestor-state-report';
import LiftStateReportConfig from './reports/lift-state-report';
import TaskSummaryReportConfig from './reports/task-summary-report';
import UserLoginFailureReportConfig from './reports/user-login-failure-report';
import UserLoginReportConfig from './reports/user-login-report';
import UserLogoutReportConfig from './reports/user-logout-report';

export enum Reports {
  queryAllLogs = 'queryAllLogs',
  showChargerStateReport = 'showChargerStateReport',
  showDispenserStateReport = 'showDispenserStateReport',
  showDoorStateReport = 'showDoorStateReport',
  showFleetStateReport = 'showFleetStateReport',
  showHealthReport = 'showHealthReport',
  showIngestorStateReport = 'showIngestorStateReport',
  showLiftStateReport = 'showLiftStateReport',
  showNegotiationsReport = 'showNegotiationsReport',
  showRobotStateReport = 'showRobotStateReport',
  showRobotMotionPlansReport = 'showRobotMotionPlansReport',
  showRobotActionReport = 'showRobotActionReport',
  showTasksReport = 'showTasksReport',
  showUserActionsReport = 'showUserActionsReport',
  showLoginsReport = 'showLoginsReport',
  showLogoutsReport = 'showLogoutsReport',
  showLoginFailuresReport = 'showLoginFailuresReport',
  showWorkCellStatesReport = 'showWorkCellStatesReport',
}

/**
 * Report dictionary with it associated component
 */

export const ReportContainer: Record<string, React.ReactElement> = {
  [Reports.queryAllLogs]: <AllLogsReport />,
  [Reports.showDispenserStateReport]: <DispenserStateReportConfig />,
  [Reports.showDoorStateReport]: <DoorStateReportConfig />,
  [Reports.showFleetStateReport]: <FleetStateReportConfig />,
  [Reports.showHealthReport]: <HealthReportConfig />,
  [Reports.showIngestorStateReport]: <IngestorStateReportConfig />,
  [Reports.showLiftStateReport]: <LiftStateReportConfig />,
  [Reports.showLoginsReport]: <UserLoginReportConfig />,
  [Reports.showLogoutsReport]: <UserLogoutReportConfig />,
  [Reports.showLoginFailuresReport]: <UserLoginFailureReportConfig />,
  [Reports.showTasksReport]: <TaskSummaryReportConfig />,
};

// To be implemented
// [Reports.showRobotStateReport]: <h1>Still not implemented</h1>,
// [Reports.showChargerStateReport]: <h1>Still not implemented</h1>,
// [Reports.showNegotiationsReport]: <h1>Still not implemented</h1>,
// [Reports.showRobotMotionPlansReport]: <h1>Still not implemented</h1>,
// [Reports.showRobotActionReport]: <h1>Still not implemented</h1>,
// [Reports.showUserActionsReport]: <h1>Still not implemented</h1>,

// [Reports.showWorkCellStatesReport]: <h1>Still not implemented</h1>,
