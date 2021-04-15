from models.raw_log import RawLog
from parsers.log_type_parser import get_log_type

from .parser_dispacher import log_model_dispacher


# Function that receives all the logs and store them on the database
async def create_raw_log(logs: list):
    for log in logs:
        print(log)
        log_level = get_log_type(log["log"])
        await RawLog.create(level=log_level, payload=log, message=log["log"])
    return "The logs were saved correctly"


# We want to grab specific data from this list of strings, so we need to preprocess
# this information
async def create_rmf_server_log(logs: list):
    for log in logs:
        print(log)
        # If it not data app, we will skip it because the create_raw_log in theory will register that log
        if "INFO:app.BookKeeper." not in log["log"]:
            continue
        modified_log = log["log"].replace("INFO:app.BookKeeper.", "")
        # it should get the model instance to add the data
        log_model_dispacher(modified_log)
    return "Logs were saved correctly"