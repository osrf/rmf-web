from enum import Enum

from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class HealthStatusEmun(Enum):
    HEALTHY = "Healthy"
    UNHEALTHY = "Unhealthy"
    DEAD = "Dead"


class HealthStatus(models.Model):
    device = fields.TextField()
    actor_id = fields.CharField(max_length=25, null=True)
    health_status = fields.CharField(max_length=25, null=True)
    health_message = fields.TextField(null=True)
    created = fields.DatetimeField(auto_now_add=True)


HealthStatus_Pydantic = pydantic_model_creator(HealthStatus, name="HealthStatus")
