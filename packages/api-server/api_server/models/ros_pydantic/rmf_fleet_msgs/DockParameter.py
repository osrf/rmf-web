# This is a generated file, do not edit

from typing import List

import pydantic

from ..rmf_fleet_msgs.Location import Location


class DockParameter(pydantic.BaseModel):
    start: str = ""  # string
    finish: str = ""  # string
    path: List[Location] = []  # rmf_fleet_msgs/Location


# # The name of the waypoint where the docking begins
# string start
#
# # The name of the waypoint where the docking ends
# string finish
#
# # The points in the docking path
# Location[] path
