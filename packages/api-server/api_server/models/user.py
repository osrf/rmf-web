from typing import Set

from pydantic import BaseModel


class User(BaseModel):
    username: str
    groups: Set[str] = set()
    roles: Set[str] = set()
