import logging

from dependencies import logger
from models.auth_events import AuthEvents
from models.raw_log import RawLog
from parsers.auth_event_parser import auth_event_parser
from parsers.log_type_parser import get_log_type

from .parser_dispatcher import log_model_dispatcher

# Function that receives all the logs and store them on the database

logger = logging.getLogger("rest_app:log_creation_handler")

"""
Formats support:

1. [{log:"text or json", kubernetes:{...}  },{log:{...}, kubernetes:{...}]

2. ['text','text','text']

"""


async def create_raw_log(logs: list):
    if len(logs) == 0:
        return "No data received"

    error_logs = []

    for log in logs:
        try:
            if isinstance(log, dict):
                if "log" not in log:
                    error_msg = (
                        "Error: format not supported. Failed to create this log "
                        + str(log)
                    )
                    logger.error(error_msg)
                    error_logs.append(error_msg)
                    continue

                log_level = get_log_type(log["log"], log["stream"])

                if "kubernetes" in log and "container_name" in log["kubernetes"]:
                    await RawLog.create(
                        level=log_level,
                        message=log["log"],
                        container_name=log["kubernetes"]["container_name"],
                    )
                else:
                    await RawLog.create(level=log_level, message=log["log"])

            elif isinstance(log, str):
                if log.isspace():
                    continue

                log_level = get_log_type(log)
                await RawLog.create(level=log_level, message=log)
        except (SyntaxError, ValueError, KeyError) as e:
            error_logs.append("Error:" + str(e) + "Log:" + str(log))

    return error_logs if len(error_logs) > 0 else "Logs were saved correctly"


# We want to grab specific data from this list of strings, so we need to preprocess
# this information
async def create_rmf_server_log(logs: list):
    if len(logs) == 0:
        return "No data received"
    error_logs = []

    for log in logs:
        try:
            # If it not data app, we will skip it because the create_raw_log in theory will register that log
            if "INFO:app.BookKeeper." not in log["log"]:
                continue
            modified_log = log["log"].replace("INFO:app.BookKeeper.", "")
            await log_model_dispatcher(modified_log)

        except (SyntaxError, ValueError, KeyError) as e:
            error_logs.append("Error:" + str(e) + "Log:" + str(log))

    return error_logs if len(error_logs) > 0 else "Logs were saved correctly"


async def create_keycloak_log(logs: list):
    if len(logs) == 0:
        return "No data received"
    error_logs = []

    for log in logs:
        try:
            # If it not data app, we will skip it because the create_raw_log in theory will register that log
            if "JSON_EVENT::" not in log["log"]:
                continue
            auth_event = await auth_event_parser(log["log"])
            await AuthEvents.create(**auth_event)

        except (SyntaxError, ValueError, KeyError) as e:
            error_logs.append("Error:" + str(e) + "Log:" + str(log))

    return error_logs if len(error_logs) > 0 else "Logs were saved correctly"
