export const rmfData = [
  {
    log:
      'INFO:app.BookKeeper.dispenser_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_dispenser", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
    stream: 'stdout',
    kubernetes: {
      container_name: 'app-that-writes-logs',
      namespace_name: 'default',
      pod_name: 'app-that-writes-logs',
      container_image: 'busybox:latest',
      container_image_id:
        'docker-pullable://busybox@sha256:ae39a6f5c07297d7ab64dbd4f82c77c874cc6a94cea29fdec309d0992574b4f7',
      pod_id: '978761c6-2a19-422f-b710-d43da2348f1f',
      host: 'minikube',
      master_url: 'https://10.96.0.1:443/api',
      namespace_id: 'e192acd4-e6e7-46c2-8514-44a27a367749',
    },
  },
  {
    log:
      'INFO:app.BookKeeper.door_state:{"door_time": {"sec": 1596, "nanosec": 548000000}, "door_name": "hardware_door", "current_mode": {"value": 0}}\n',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.fleet_state:{"name": "tinyRobot", "robots": [{"name": "tinyRobot1", "model": "", "task_id": "", "seq": 3194, "mode": {"mode": 1, "mode_request_id": 0}, "battery_percent": 100.0, "location": {"t": {"sec": 1600, "nanosec": 189000000}, "x": 11.55367374420166, "y": -11.317498207092285, "yaw": -1.5998055934906006, "level_name": "L1", "index": 0}, "path": []}, {"name": "tinyRobot2", "model": "", "task_id": "", "seq": 3194, "mode": {"mode": 1, "mode_request_id": 0}, "battery_percent": 100.0, "location": {"t": {"sec": 1600, "nanosec": 189000000}, "x": 15.15751838684082, "y": -11.22861385345459, "yaw": -1.5839799642562866, "level_name": "L1", "index": 0}, "path": []}]}\n',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.door_health:{"id": "hardware_door", "health_status": "HealthStatus.HEALTHY", "health_message": null}\n',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.ingestor_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_ingestor", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.lift_state: {"lift_name": "test_lift", "lift_time": 0, "available_floors": ["L1", "L2"], "current_floor": "L1", "destination_floor": "L2", "door_state": 0, "motion_state": 0, "available_modes": [0], "current_mode": 0, "session_id": "test_session"}\n',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Loop0", "task_profile": {"task_id": "Loop0", "submission_time": {"sec": 131, "nanosec": 553000000}, "description": {"start_time": {"sec": 1623383402, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 1}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": 1, "start_name": "supplies", "finish_name": "coe"}, "delivery": {"task_id": "", "items": [], "pickup_place_name": "", "pickup_dispenser": "", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "", "dropoff_ingestor": "", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": ""}}}, "state": 0, "status": "test_status", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623383362, "nanosec": 348338289}, "end_time": {"sec": 1623383449, "nanosec": 79154833}, "robot_name": "tinyRobot2"}',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Delivery1", "task_profile": {"task_id": "Delivery1", "submission_time": {"sec": 132, "nanosec": 553000098}, "description": {"start_time": {"sec": 1623383487, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 2}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": "", "start_name": "", "finish_name": ""}, "delivery": {"task_id": "", "items": ["item1", "item2"], "pickup_place_name": "pantry", "pickup_dispenser": "coke_dispenser", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "lounge", "dropoff_ingestor": "ingestor", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": ""}}}, "state": 0, "status": "test_status2", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623383362, "nanosec": 348338289}, "end_time": {"sec": 1623383449, "nanosec": 79154833}, "robot_name": "tinyRobot1"}',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Clean2", "task_profile": {"task_id": "Clean2", "submission_time": {"sec": 131, "nanosec": 552120070}, "description": {"start_time": {"sec": 145383402, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 4}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": "", "start_name": "", "finish_name": ""}, "delivery": {"task_id": "", "items": [], "pickup_place_name": "", "pickup_dispenser": "", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "", "dropoff_ingestor": "", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": "cleanzone"}}}, "state": 0, "status": "test_status3", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623283162, "nanosec": 348332939}, "end_time": {"sec": 162593449, "nanosec": 79154833}, "robot_name": "tinyRobot3"}',
    stream: 'stdout',
  },
];

export const dispenserStateData = [
  {
    log:
      'INFO:app.BookKeeper.dispenser_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_dispenser", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
    stream: 'stdout',
    kubernetes: {
      container_name: 'app-that-writes-logs',
      namespace_name: 'default',
      pod_name: 'app-that-writes-logs',
      container_image: 'busybox:latest',
      container_image_id:
        'docker-pullable://busybox@sha256:ae39a6f5c07297d7ab64dbd4f82c77c874cc6a94cea29fdec309d0992574b4f7',
      pod_id: '978761c6-2a19-422f-b710-d43da2348f1f',
      host: 'minikube',
      master_url: 'https://10.96.0.1:443/api',
      namespace_id: 'e192acd4-e6e7-46c2-8514-44a27a367749',
    },
  },
];

export const doorStateData = [
  {
    log:
      'INFO:app.BookKeeper.door_state:{"door_time": {"sec": 1596, "nanosec": 548000000}, "door_name": "hardware_door", "current_mode": {"value": 0}}\n',
    stream: 'stdout',
  },
];

export const fleetStateData = [
  {
    log:
      'INFO:app.BookKeeper.fleet_state:{"name": "tinyRobot", "robots": [{"name": "tinyRobot1", "model": "", "task_id": "", "seq": 3194, "mode": {"mode": 1, "mode_request_id": 0}, "battery_percent": 100.0, "location": {"t": {"sec": 1600, "nanosec": 189000000}, "x": 11.55367374420166, "y": -11.317498207092285, "yaw": -1.5998055934906006, "level_name": "L1", "index": 0}, "path": []}, {"name": "tinyRobot2", "model": "", "task_id": "", "seq": 3194, "mode": {"mode": 1, "mode_request_id": 0}, "battery_percent": 100.0, "location": {"t": {"sec": 1600, "nanosec": 189000000}, "x": 15.15751838684082, "y": -11.22861385345459, "yaw": -1.5839799642562866, "level_name": "L1", "index": 0}, "path": []}]}\n',
    stream: 'stdout',
  },
];

export const healthData = [
  {
    log:
      'INFO:app.BookKeeper.door_health:{"id": "hardware_door", "health_status": "HealthStatus.HEALTHY", "health_message": null}\n',
    stream: 'stdout',
  },
];

export const ingestorData = [
  {
    log:
      'INFO:app.BookKeeper.ingestor_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_ingestor", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
    stream: 'stdout',
  },
];

export const liftsStateData = [
  {
    log:
      'INFO:app.BookKeeper.lift_state: {"lift_name": "test_lift", "lift_time": 0, "available_floors": ["L1", "L2"], "current_floor": "L1", "destination_floor": "L2", "door_state": 0, "motion_state": 0, "available_modes": [0], "current_mode": 0, "session_id": "test_session"}\n',
    stream: 'stdout',
  },
];

export const taskSummaryData = [
  {
    log:
      'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Loop0", "task_profile": {"task_id": "Loop0", "submission_time": {"sec": 131, "nanosec": 553000000}, "description": {"start_time": {"sec": 1623383402, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 1}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": 1, "start_name": "supplies", "finish_name": "coe"}, "delivery": {"task_id": "", "items": [], "pickup_place_name": "", "pickup_dispenser": "", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "", "dropoff_ingestor": "", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": ""}}}, "state": 0, "status": "test_status", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623383362, "nanosec": 348338289}, "end_time": {"sec": 1623383449, "nanosec": 79154833}, "robot_name": "tinyRobot2"}',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Delivery1", "task_profile": {"task_id": "Delivery1", "submission_time": {"sec": 132, "nanosec": 553000098}, "description": {"start_time": {"sec": 1623383487, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 2}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": "", "start_name": "", "finish_name": ""}, "delivery": {"task_id": "", "items": ["item1", "item2"], "pickup_place_name": "pantry", "pickup_dispenser": "coke_dispenser", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "lounge", "dropoff_ingestor": "ingestor", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": ""}}}, "state": 0, "status": "test_status2", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623383362, "nanosec": 348338289}, "end_time": {"sec": 1623383449, "nanosec": 79154833}, "robot_name": "tinyRobot1"}',
    stream: 'stdout',
  },
  {
    log:
      'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Clean2", "task_profile": {"task_id": "Clean2", "submission_time": {"sec": 131, "nanosec": 552120070}, "description": {"start_time": {"sec": 145383402, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 4}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": "", "start_name": "", "finish_name": ""}, "delivery": {"task_id": "", "items": [], "pickup_place_name": "", "pickup_dispenser": "", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "", "dropoff_ingestor": "", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": "cleanzone"}}}, "state": 0, "status": "test_status3", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623283162, "nanosec": 348332939}, "end_time": {"sec": 162593449, "nanosec": 79154833}, "robot_name": "tinyRobot3"}',
    stream: 'stdout',
  },
];

export const userData = [];
