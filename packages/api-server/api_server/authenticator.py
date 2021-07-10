from typing import Callable, List

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OpenIdConnect

from .models import User


class AuthenticationError(Exception):
    pass


class JwtAuthenticator:
    def __init__(self, pem_file: str, client_id: str, aud: str, iss: str):
        """
        Authenticates with a JWT token, the client must send an auth params with
        a "token" key.
        :param pem_file: path to a pem encoded certificate used to verify a token.
        """
        self.client_id = client_id
        self.aud = aud
        self.iss = iss
        with open(pem_file, "br") as f:
            self._public_key = f.read()

    def _get_user(self, claims: dict) -> User:
        def get_roles_groups(claims: dict):
            roles = set()
            groups = set()
            if "resource_access" not in claims:
                return roles, groups
            resource_access = claims["resource_access"]
            if self.client_id not in resource_access:
                return roles, groups

            jwt_roles: List[str] = resource_access[self.client_id]["roles"] or []
            for r in jwt_roles:
                if r.startswith("_rmf_"):
                    roles.add(r)
                elif r.startswith("rmf_"):
                    groups.add(r)
            return roles, groups

        if not "preferred_username" in claims:
            raise AuthenticationError(
                "expected 'preferred_username' username claim to be present"
            )

        roles, groups = get_roles_groups(claims)
        return User(username=claims["preferred_username"], roles=roles, groups=groups)

    def verify_token(self, token: str) -> User:
        try:
            claims = jwt.decode(
                token,
                self._public_key,
                algorithms=["RS256"],
                audience=self.aud,
                issuer=self.iss,
            )
            return self._get_user(claims)
        except jwt.InvalidTokenError as e:
            raise AuthenticationError(str(e)) from e

    def fastapi_dep(self, oidc_url: str) -> Callable[..., User]:
        def dep(auth_header: str = Depends(OpenIdConnect(openIdConnectUrl=oidc_url))):
            parts = auth_header.split(" ")
            if len(parts) != 2 or parts[0].lower() != "bearer":
                raise HTTPException(401, "invalid bearer format")
            try:
                return self.verify_token(parts[1])
            except AuthenticationError as e:
                raise HTTPException(401, str(e)) from e

        return dep
