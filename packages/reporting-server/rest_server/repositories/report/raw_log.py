from datetime import datetime, timezone
from typing import List, Optional

from dateutil import parser, tz
from models.raw_log import RawLog, RawLog_Pydantic


async def get_all_raw_logs(
    offset: int,
    limit: int,
    to_log_date: Optional[str] = None,
    from_log_date: Optional[str] = None,
    log_label: Optional[str] = None,
    log_level: Optional[str] = None,
):
    query = {}

    if from_log_date:
        local_time = parser.parse(from_log_date)
        utc_time = local_time.astimezone(timezone.utc)
        query["created__gte"] = utc_time

    if to_log_date:
        to_log_local_time = parser.parse(to_log_date)
        to_log_utc_time = to_log_local_time.astimezone(timezone.utc)
        query["created__lt"] = to_log_utc_time

    if log_level and log_level != "all":
        query["level__iexact"] = log_level

    # if log_label:
    #     query['name__gte'] = log_label

    return await RawLog_Pydantic.from_queryset(
        RawLog.filter(**query).offset(offset).limit(limit)
    )


async def get_doors_state():
    return "work in progress"