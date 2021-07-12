import React from 'react';
import {
  DefaultReportQueryPayload,
  TaskSummaryReport,
  TaskSummaryRowsType,
} from 'react-components';
import appConfig from '../../app-config';
import { AuthenticatorContext } from '../auth-contexts';
import { getLogData } from './utils';

const TaskSummaryReportConfig = () => {
  const authenticator = React.useContext(AuthenticatorContext);
  const getLogs = async (params: DefaultReportQueryPayload): Promise<TaskSummaryRowsType> => {
    return (await getLogData(
      `${appConfig.reportingServerUrl}/report/task_summary/`,
      params,
      authenticator.token,
    )) as TaskSummaryRowsType;
  };

  return <TaskSummaryReport getLogs={getLogs} />;
};

export default TaskSummaryReportConfig;
