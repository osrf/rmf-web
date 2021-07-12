from . import raw_data


def parse_log(log):
    modified_log = log["log"].replace("INFO:app.BookKeeper.", "")
    return modified_log


# States
mock_dispenser_state: str = parse_log(raw_data.mock_dispenser_state)

mock_door_state: str = parse_log(raw_data.mock_door_state)

mock_fleet_state: str = parse_log(raw_data.mock_fleet_state)

mock_task_summary: str = parse_log(raw_data.mock_task_summary)

mock_ingestor_state: str = parse_log(raw_data.mock_ingestor_state)

mock_lift_state: str = parse_log(raw_data.mock_lift_state)

# Health
mock_door_health: str = parse_log(raw_data.mock_door_health)
