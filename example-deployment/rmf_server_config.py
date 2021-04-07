from copy import deepcopy

from api_server.default_config import config as default_config

config = deepcopy(default_config)
config["host"] = "0.0.0.0"
config["port"] = "8000"
config["root_path"] = "/rmf/api/1.0"
config["proxy_url"] = "https://example.com/rmf/api/1.0"
config["jwt_public_key"] = "/jwt-configmap/jwt-pub-key.pub"
config[
    "oidc_url"
] = "https://example.com/auth/realms/rmf-web/.well-known/openid-configuration"
config["client_id"] = "dashboard"