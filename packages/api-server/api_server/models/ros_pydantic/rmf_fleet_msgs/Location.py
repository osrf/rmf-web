# This is a generated file, do not edit

from typing import List

import pydantic

from ..builtin_interfaces.Time import Time


class Location(pydantic.BaseModel):
    t: Time = Time()  # builtin_interfaces/Time
    x: float = 0  # float32
    y: float = 0  # float32
    yaw: float = 0  # float32
    level_name: str = ""  # string
    index: pydantic.PositiveInt = 0  # uint64


# builtin_interfaces/Time t
# float32 x
# float32 y
# float32 yaw
# string level_name
# uint64 index
