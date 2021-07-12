from enum import Enum

from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class LogLevel(str, Enum):
    CRITICAL = "critical"
    ERROR = "error"
    WARN = "warn"
    INFO = "info"
    DEBUG = "debug"
    UNKNOWN = "unknown"


class RawLog(models.Model):
    id = fields.IntField(pk=True)
    # JSONField https://tortoise-orm.readthedocs.io/en/latest/fields.html#tortoise.fields.data.IntField.field_type
    level: LogLevel = fields.CharEnumField(LogLevel, default=LogLevel.INFO)
    message = fields.TextField()
    created = fields.DatetimeField(auto_now_add=True)
    container_name = fields.TextField(null=True)

    def __str__(self):
        return str(self.message)


RawLog_Pydantic = pydantic_model_creator(RawLog, name="RawLog")
