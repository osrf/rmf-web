# This is a generated file, do not edit

from typing import List

import pydantic


class RobotMode(pydantic.BaseModel):
    mode: pydantic.conint(ge=0, le=4294967295) = 0  # uint32
    mode_request_id: pydantic.PositiveInt = 0  # uint64


# uint32 mode
# uint32 MODE_IDLE=0
# uint32 MODE_CHARGING=1
# uint32 MODE_MOVING=2
# uint32 MODE_PAUSED=3
# uint32 MODE_WAITING=4
# uint32 MODE_EMERGENCY=5
# uint32 MODE_GOING_HOME=6
# uint32 MODE_DOCKING=7
#
# # Use this when a command received from the fleet adapter
# # has a problem and needs to be recomputed.
# uint32 MODE_ADAPTER_ERROR=8
#
# uint64 mode_request_id
