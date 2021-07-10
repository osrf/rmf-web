from typing import TypeVar

from tortoise.fields import CharField, ForeignKeyRelation, ReverseRelation
from tortoise.models import Model

ModelT = TypeVar("ModelT", bound=Model)


class ResourcePermission:
    resource: ForeignKeyRelation["ProtectedResourceModel"]
    group = CharField(255)
    permission = CharField(255)


class ResourcePermissionModel(Model, ResourcePermission):
    pass


# hack so that tortoise does not generate a schema
ResourcePermissionModel = None


class ProtectedResource:
    owner = CharField(255, null=True)
    permissions: ReverseRelation[ResourcePermissionModel]


class ProtectedResourceModel(Model, ProtectedResource):
    pass


# hack so that tortoise does not generate a schema
ProtectedResourceModel = None
