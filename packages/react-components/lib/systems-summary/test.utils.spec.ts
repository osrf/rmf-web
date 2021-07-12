import { format } from 'date-fns';
import * as RmfModels from 'rmf-models';
import { ItemSummary, RobotSummary } from '.';
import { Notification, Severity } from '../notifications-dialog';

export const itemSummary: ItemSummary = {
  operational: 0,
  spoiltItem: [],
};

export const robotSummary: RobotSummary = {
  operational: 0,
  idle: 0,
  charging: 0,
  spoiltRobots: [],
};

export const notifications: Notification[] = [
  {
    id: 1,
    time: format(new Date(), 'MM/dd/yyyy HH:mm'),
    error: 'message',
    severity: Severity.High,
  },
];

export const tasks: RmfModels.TaskSummary[] = [
  new RmfModels.TaskSummary({
    task_id: '1',
    state: 0,
    start_time: { sec: 0, nanosec: 0 },
    status: 'state',
    submission_time: { sec: 0, nanosec: 0 },
    end_time: { sec: 0, nanosec: 0 },
  }),
  new RmfModels.TaskSummary({
    task_id: '2',
    state: 1,
    start_time: { sec: 0, nanosec: 0 },
    status: 'state',
    submission_time: { sec: 0, nanosec: 0 },
    end_time: { sec: 0, nanosec: 0 },
  }),
  new RmfModels.TaskSummary({
    task_id: '3',
    state: 2,
    start_time: { sec: 0, nanosec: 0 },
    status: 'state',
    submission_time: { sec: 0, nanosec: 0 },
    end_time: { sec: 0, nanosec: 0 },
  }),
  new RmfModels.TaskSummary({
    task_id: '4',
    state: 3,
    start_time: { sec: 0, nanosec: 0 },
    status: 'state',
    submission_time: { sec: 0, nanosec: 0 },
    end_time: { sec: 0, nanosec: 0 },
  }),
];

export const door: RmfModels.Door = {
  name: 'door',
  v1_x: 8.2,
  v1_y: -5.5,
  v2_x: 7.85,
  v2_y: -6.2,
  door_type: 2,
  motion_range: -1.571,
  motion_direction: 1,
};

export const lift: RmfModels.Lift = {
  name: 'lift',
  doors: [door],
  levels: ['L1', 'L2', 'L3'],
  ref_x: 7.1,
  ref_y: -2.8,
  ref_yaw: -0.5,
  width: 2.5,
  depth: 2.5,
  wall_graph: {
    name: 'wallgraph',
    vertices: [],
    edges: [],
    params: [],
  },
};

export const fleet: RmfModels.FleetState = {
  name: 'fleet',
  robots: [
    new RmfModels.RobotState({
      name: 'robot',
      model: 'Model1',
      mode: new RmfModels.RobotMode({ mode: RmfModels.RobotMode.MODE_EMERGENCY }),
      location: new RmfModels.Location({
        level_name: 'L1',
        x: 4,
        y: -12,
        yaw: 0,
        t: { sec: 0, nanosec: 0 },
      }),
      battery_percent: 100,
      path: [],
      task_id: 'task1',
    }),
  ],
};
