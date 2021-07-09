from enum import Enum

from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Container(models.Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()


Container_Pydantic = pydantic_model_creator(Container, name="Container")
