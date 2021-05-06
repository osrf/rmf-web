import importlib
import os
import urllib.parse
from dataclasses import dataclass
from typing import Optional


@dataclass
class AppConfig:
    host: str
    port: int
    db_url: str
    public_url: urllib.parse.ParseResult
    static_directory: str
    log_level: str
    jwt_public_key: Optional[str]
    oidc_url: Optional[str]
    aud: str
    iss: Optional[str]

    def __post_init__(self):
        self.public_url = urllib.parse.urlparse(self.public_url)


def _load_config() -> AppConfig:
    if "RMF_API_SERVER_CONFIG" in os.environ:
        config_file = os.environ["RMF_API_SERVER_CONFIG"]
    else:
        config_file = f"{os.path.dirname(__file__)}/default_config.py"

    spec = importlib.util.spec_from_file_location("config", config_file)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    config = AppConfig(**module.config)
    if "RMF_API_SERVER_LOG_LEVEL" in os.environ:
        config.log_level = os.environ["RMF_API_SERVER_LOG_LEVEL"]
    return config


app_config = _load_config()
