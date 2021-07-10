import os

from api_server.default_config import config

if "CI" in os.environ:
    iss = "http://rmf-web_keycloak_1:8080/auth/realms/master"
else:
    iss = "http://localhost:8088/auth/realms/master"
config.update(
    {
        "jwt_public_key": "certs/keycloak.pub",
        "oidc_url": "http://localhost:8088/auth/realms/master/.well-known/openid-configuration",
        "client_id": "rmf-dashboard",
        "aud": "rmf-dashboard",
        "iss": iss,
    }
)
