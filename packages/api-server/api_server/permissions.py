from enum import Enum
from typing import Optional, Sequence, TypeVar

from tortoise.query_utils import Q
from tortoise.queryset import QuerySet
from tortoise.transactions import in_transaction

from .models import User
from .models.tortoise_models import ProtectedResource, ProtectedResourceModel

ProtectedResourceT = TypeVar("ProtectedResourceT", bound=ProtectedResourceModel)


class Permission(Enum):
    Read = "read"
    Write = "write"


class RmfRole(Enum):
    SuperAdmin = "_rmf_superadmin"
    TaskSubmit = "_rmf_task_submit"
    TaskCancel = "_rmf_task_cancel"
    TaskAdmin = "_rmf_task_admin"


class Enforcer:
    @staticmethod
    async def is_authorized(
        r: ProtectedResourceModel, user: User, permission: Permission
    ):
        if r.owner == user.username:
            return True

        perm = await r.permissions.remote_model.filter(
            group__in=user.groups, permission=permission
        ).first()
        return perm is not None

    @staticmethod
    def _has_role(user: User, role: RmfRole) -> bool:
        return any((r in [RmfRole.SuperAdmin.value, role.value] for r in user.roles))

    @staticmethod
    def can_submit_task(user: User) -> bool:
        return Enforcer._has_role(user, RmfRole.TaskSubmit)

    @staticmethod
    def can_cancel_task(user: User):
        return Enforcer._has_role(user, RmfRole.TaskCancel)

    @staticmethod
    def query(
        user: User,
        r: QuerySet[ProtectedResource],
        admin_roles: Optional[Sequence[str]] = None,
    ) -> QuerySet[ProtectedResourceModel]:
        """
        Augments a query with the read permissions of an user, this returns a query
        that only returns results that the user can see.

        :param admin_roles: A list of roles to be considered admins, an admin will be
        able to see all of the resources regardless of their groups. The SuperAdmin role
        is always an admin.
        """
        admin_roles = admin_roles or []
        for role in user.roles:
            if role == RmfRole.SuperAdmin.value or role in admin_roles:
                return r.all()
        return r.filter(
            Q(
                permissions__group__in=user.groups,
                permissions__permission=Permission.Read,
            )
            | Q(owner=user.username)
        )

    @staticmethod
    async def save_permissions(
        r: ProtectedResourceModel,
        groups: Sequence[str],
        permissions: Sequence[Permission] = None,
    ):
        """
        Saves the permissions of a protected resource into the database.
        All the groups will be given the same set of permissions.
        """
        permissions = permissions or [Permission.Read]
        async with in_transaction():
            for group in groups:
                for perm in permissions:
                    await r.permissions.remote_model.update_or_create(
                        resource=r, group=group, permission=perm
                    )
