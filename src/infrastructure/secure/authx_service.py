"""Authentication services configuration.

Creates a configured AuthX instance for JWT validation and an HTTP Bearer
security scheme for extracting tokens from the `Authorization` header.
"""
from authx import AuthX, AuthXConfig
from fastapi.security import HTTPBearer

from src.config.authx_service_settings import settings

class AuthConfig:
    """AuthX configuration holder.

    Builds an `AuthXConfig` from application settings and exposes a ready-to-use
    `AuthX` instance via the `secure` attribute.
    """
    _config = AuthXConfig(
        JWT_SECRET_KEY = settings.JWT_SECRET_KEY,
        JWT_ALGORITHM = settings.JWT_ALGORITHM,
        JWT_ACCESS_TOKEN_EXPIRES = settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        JWT_TOKEN_LOCATION = ["headers"]
    )

    secure = AuthX(config=_config)

class BearerScheme:
    """FastAPI HTTP Bearer scheme dependency.

    Used to parse and validate the presence of a Bearer token in requests.
    """
    bearer_scheme = HTTPBearer()

authx_service = AuthConfig.secure
"""Configured AuthX service instance."""
bearer_scheme = BearerScheme.bearer_scheme
"""Configured FastAPI HTTPBearer dependency."""
