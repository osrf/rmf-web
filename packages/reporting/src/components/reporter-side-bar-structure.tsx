import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AndroidIcon from '@material-ui/icons/Android';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import { Reports } from './report-list';
import { ExpandableMultilevelMenuProps } from 'react-components';

export type BuildMenuType = (report: Reports) => void;

export const buildReportMenuStructure = (
  setCurrentReport: BuildMenuType,
): ExpandableMultilevelMenuProps[] => {
  return [
    {
      icon: <SearchIcon />,
      title: 'All logs',
      items: [],
      onClick: () => setCurrentReport(Reports.queryAllLogs),
    },
    {
      icon: <ArrowForwardIcon />,
      title: 'Dispensers',
      items: [],
      onClick: () => setCurrentReport(Reports.showDispenserStateReport),
    },
    {
      icon: <KitchenIcon />,
      title: 'Doors',
      items: [],
      onClick: () => setCurrentReport(Reports.showDoorStateReport),
    },
    {
      icon: <AndroidIcon />,
      title: 'Fleets',
      items: [],
      onClick: () => setCurrentReport(Reports.showFleetStateReport),
    },
    {
      icon: <LocalHospitalIcon />,
      title: 'Health',
      items: [],
      onClick: () => setCurrentReport(Reports.showHealthReport),
    },
    {
      icon: <ArrowBackIcon />,
      title: 'Ingestor',
      items: [],
      onClick: () => setCurrentReport(Reports.showIngestorStateReport),
    },
    {
      icon: <ArrowDropUpIcon />,
      title: 'Lifts',
      onClick: () => setCurrentReport(Reports.showLiftStateReport),
    },
    {
      icon: <PlaylistAddCheckIcon />,
      title: 'Tasks',
      onClick: () => setCurrentReport(Reports.showTasksReport),
    },
    {
      icon: <AccountCircleIcon />,
      title: 'Users',
      items: [
        {
          title: 'Logins',
          items: [],
          onClick: () => setCurrentReport(Reports.showLoginsReport),
        },
        {
          title: 'Logouts',
          items: [],
          onClick: () => setCurrentReport(Reports.showLogoutsReport),
        },
        {
          title: 'Login failures',
          items: [],
          onClick: () => setCurrentReport(Reports.showLoginFailuresReport),
        },
      ],
    },
  ] as ExpandableMultilevelMenuProps[];
};
