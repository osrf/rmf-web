from enum import Enum

from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class DoorStateEnum(str, Enum):
    CLOSED = "closed"
    MOVING = "moving"
    OPEN = "open"
    OFFLINE = "offline"
    UNKNOWN = "unknown"


class DoorStateService:
    def get_state_name(self, door_state: int):
        if door_state == 0:
            return DoorStateEnum.CLOSED
        elif door_state == 1:
            return DoorStateEnum.MOVING
        elif door_state == 2:
            return DoorStateEnum.OPEN
        elif door_state == 3:
            return DoorStateEnum.OFFLINE
        elif door_state == 4:
            return DoorStateEnum.UNKNOWN
        else:
            return DoorStateEnum.UNKNOWN


class DoorState(models.Model):
    id = fields.IntField(pk=True)
    # JSONField https://tortoise-orm.readthedocs.io/en/latest/fields.html#tortoise.fields.data.IntField.field_type
    state: DoorStateEnum = fields.CharEnumField(
        DoorStateEnum, default=DoorStateEnum.UNKNOWN
    )
    name = fields.CharField(max_length=200)
    created = fields.DatetimeField(auto_now_add=True)

    service = DoorStateService()


DoorState_Pydantic = pydantic_model_creator(DoorState, name="DoorState")
