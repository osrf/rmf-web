import {
  DispenserStateRowsType,
  DoorStateRowsType,
  FleetStateRowsType,
  HealthRowsType,
  IngestorStateRowsType,
  LiftStateRowsType,
  TaskSummaryRowsType,
} from '.';

const timestamp = new Date('Mon Jan  1 00:00:02 UTC 2001').toISOString();

export const getDispenserLogs = (): DispenserStateRowsType => {
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push({
      state: 'OPEN',
      guid: 'dispenser_test',
      created: timestamp,
    });
  }
  return rows;
};

export const getDoorLogs = (): DoorStateRowsType => {
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push({
      created: timestamp,
      state: 'OPEN',
      name: 'door_test',
    });
  }
  return rows;
};

export const getFleetLogs = (): FleetStateRowsType => {
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push({
      created: timestamp,
      name: 'fleet_test',
      fleet_name: 'test',
      robots: 'test',
      robot_battery_percent: 'test',
      robot_location: 'test',
      robot_mode: 'test',
      robot_model: 'test',
      robot_name: 'test',
      robot_seq: 1,
      robot_task_id: 'test',
    });
  }
  return rows as FleetStateRowsType;
};

export const getHealthLogs = (): HealthRowsType => {
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push({
      device: 'door',
      actor_id: 'door-1',
      health_status: 'DEAD',
      health_message: 'this is a message',
      created: timestamp,
    });
  }
  return rows;
};

export const getIngestorLogs = (): IngestorStateRowsType =>
  getDispenserLogs() as IngestorStateRowsType;

export const getLiftLogs = (): LiftStateRowsType => {
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push({
      state: 'AVG',
      door_state: 'Closed',
      destination_floor: 'L1',
      motion_state: 'DOWN',
      current_floor: 'L2',
      session_id: 'session',
      created: timestamp,
    });
  }
  return rows;
};

export const getTaskSummaryLogs = (): TaskSummaryRowsType => {
  const exampleData = {
    task_id: 'test',
    submission_time: { sec: 131, nanosec: 553000000 },
    description: {
      start_time: { sec: 1623383402, nanosec: 0 },
      priority: { value: 0 },
      task_type: { type: 1 },
      station: { task_id: '', robot_type: '', place_name: '' },
      loop: { task_id: '', robot_type: '', num_loops: 1, start_name: '', finish_name: '' },
      delivery: {
        task_id: '',
        items: [],
        pickup_place_name: '',
        pickup_dispenser: '',
        pickup_behavior: { name: '', parameters: [] },
        dropoff_place_name: '',
        dropoff_ingestor: '',
        dropoff_behavior: { name: '', parameters: [] },
      },
      clean: { start_waypoint: '' },
    },
  };
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push({
      created: timestamp,
      fleet_name: 'Test',
      task_id: i.toString(),
      task_profile: exampleData,
      state: 'test',
      status: 'test',
      submission_time: { sec: 131, nanosec: 553000000 },
      start_time: { sec: 131, nanosec: 553000000 },
      end_time: { sec: 131, nanosec: 553000000 },
      robot_name: 'test',
    });
  }
  return rows;
};
