# States
mock_dispenser_state = {
    "log": 'INFO:app.BookKeeper.dispenser_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_dispenser", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
    "stream": "stdout",
    "kubernetes": {
        "container_name": "app-that-writes-logs",
        "namespace_name": "default",
        "pod_name": "app-that-writes-logs",
        "container_image": "busybox:latest",
        "container_image_id": "docker-pullable://busybox@sha256:ae39a6f5c07297d7ab64dbd4f82c77c874cc6a94cea29fdec309d0992574b4f7",
        "pod_id": "978761c6-2a19-422f-b710-d43da2348f1f",
        "host": "minikube",
        "master_url": "https://10.96.0.1:443/api",
        "namespace_id": "e192acd4-e6e7-46c2-8514-44a27a367749",
    },
}

mock_door_state = {
    "log": 'INFO:app.BookKeeper.door_state:{"door_time": {"sec": 1596, "nanosec": 548000000}, "door_name": "hardware_door", "current_mode": {"value": 0}}\n',
    "stream": "stdout",
}

mock_fleet_state = {
    "log": 'INFO:app.BookKeeper.fleet_state:{"name": "tinyRobot", "robots": [{"name": "tinyRobot1", "model": "", "task_id": "", "seq": 3190, "mode": {"mode": 1, "mode_request_id": 0}, "battery_percent": 100.0, "location": {"t": {"sec": 1598, "nanosec": 184999999}, "x": 11.553672790527344, "y": -11.317496299743652, "yaw": -1.599777340888977, "level_name": "L1", "index": 0}, "path": []}, {"name": "tinyRobot2", "model": "", "task_id": "", "seq": 3191, "mode": {"mode": 1, "mode_request_id": 0}, "battery_percent": 100.0, "location": {"t": {"sec": 1598, "nanosec": 685999999}, "x": 15.157517433166504, "y": -11.228611946105957, "yaw": -1.5839587450027466, "level_name": "L1", "index": 0}, "path": []}]}\n',
    "stream": "stdout",
}

mock_task_summary = {
    "log": 'INFO:app.BookKeeper.task_summary:{"fleet_name": "tinyRobot", "task_id": "Loop0", "task_profile": {"task_id": "Loop0", "submission_time": {"sec": 131, "nanosec": 553000000}, "description": {"start_time": {"sec": 1623383402, "nanosec": 0}, "priority": {"value": 0}, "task_type": {"type": 1}, "station": {"task_id": "", "robot_type": "", "place_name": ""}, "loop": {"task_id": "", "robot_type": "", "num_loops": 1, "start_name": "supplies", "finish_name": "coe"}, "delivery": {"task_id": "", "items": [], "pickup_place_name": "", "pickup_dispenser": "", "pickup_behavior": {"name": "", "parameters": []}, "dropoff_place_name": "", "dropoff_ingestor": "", "dropoff_behavior": {"name": "", "parameters": []}}, "clean": {"start_waypoint": ""}}}, "state": 0, "status": "", "submission_time": {"sec": 0, "nanosec": 0}, "start_time": {"sec": 1623383362, "nanosec": 348338289}, "end_time": {"sec": 1623383449, "nanosec": 79154833}, "robot_name": "tinyRobot2"}\n',
    "stream": "stdout",
}

mock_ingestor_state = {
    "log": 'INFO:app.BookKeeper.ingestor_state:{"time": {"sec": 1600, "nanosec": 0}, "guid": "coke_ingestor", "mode": 0, "request_guid_queue": [], "seconds_remaining": 0.0}\n',
    "stream": "stdout",
}

mock_lift_state = {
    "log": 'INFO:app.BookKeeper.lift_state: {"lift_name": "test_lift", "lift_time": 0, "available_floors": ["L1", "L2"], "current_floor": "L1", "destination_floor": "L2", "door_state": 0, "motion_state": 0, "available_modes": [0], "current_mode": 0, "session_id": "test_session"}\n',
    "stream": "stdout",
}


# Health
mock_door_health = {
    "log": 'INFO:app.BookKeeper.door_health:{"id": "hardware_door", "health_status": "HealthStatus.HEALTHY", "health_message": null}\n',
    "stream": "stdout",
}

# Keycloak
mock_keycloak_login_error = {
    "log": '[0m[0m20:41:54,721 INFO  [org.keycloak.events] (default task-2) JSON_EVENT::{"type":"LOGIN_ERROR","realmId":"579ce396-83c7-4094-964d-7ea07553089f","clientId":"reporting","ipAddress":"192.168.49.1","error":"user_not_found","auth_method":"openid-connect","auth_type":"code","redirect_uri":"https://example.com/reporting","code_id":"f813403c-2732-4062-9911-cf65b89a2278","username":"test"}',
    "stream": "stdout",
    "kubernetes": {
        "container_name": "app-that-writes-logs",
    },
}

mock_keycloak_login = {
    "log": '19:47:08,004 INFO  [org.keycloak.events] (default task-3) JSON_EVENT::{"type":"LOGIN","realmId":"master","clientId":"security-admin-console","userId":"7d2f3cdd-9778-4847-ab9d-db68f70f043f","ipAddress":"172.22.0.1","auth_method":"openid-connect","auth_type":"code","redirect_uri":"http://localhost:8080/auth/admin/master/console/","consent":"no_consent_required","code_id":"ac8c82d7-45ac-4227-86d3-e167b176e26f","username":"admin"}',
    "stream": "stdout",
}

mock_keycloak_logout = {
    "log": '19:47:20,649 INFO  [org.keycloak.events] (default task-6) JSON_EVENT::{"type":"LOGOUT","realmId":"master","userId":"7d2f3cdd-9778-4847-ab9d-db68f70f043f","ipAddress":"172.22.0.1","redirect_uri":"http://localhost:8080/auth/admin/master/console/#/realms/master"}',
    "stream": "stdout",
}
