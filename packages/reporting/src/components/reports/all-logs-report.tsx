import React from 'react';
import axios from 'axios';
import { LogManagement, LogQueryPayload, LogRowsType } from 'react-components';
import appConfig from '../../app-config';
import { AuthenticatorContext } from '../auth-contexts';

const AllLogsReport = () => {
  const authenticator = React.useContext(AuthenticatorContext);
  const getLogs = async (params: LogQueryPayload): Promise<LogRowsType> => {
    try {
      const response = await axios.get(`${appConfig.reportingServerUrl}/report/raw_logs/`, {
        params: {
          toLogDate: params.toLogDate ? params.toLogDate : null,
          fromLogDate: params.fromLogDate ? params.fromLogDate : null,
          containerLabel: params.logLabel,
          logLevel: params.logLevel,
          offset: params.offset,
        },
        headers: {
          Authorization: 'Bearer ' + authenticator.token,
        },
      });
      return response.data as LogRowsType;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getLogServerLabels = async (): Promise<{ label: string; value: string }[]> => {
    try {
      const response = await axios.get(
        `${appConfig.reportingServerUrl}/report/raw_logs/containers`,
        {
          headers: {
            Authorization: 'Bearer ' + authenticator.token,
          },
        },
      );
      const labelsData = response.data as string[];
      const labels: { label: string; value: string }[] = [];
      labelsData.forEach((element) => {
        labels.push({ label: element, value: element });
      });
      // If we want to get results from all labels
      labels.push({ label: 'All', value: 'all' });
      return labels;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return <LogManagement getLogs={getLogs} getLabels={getLogServerLabels} />;
};

export default AllLogsReport;
