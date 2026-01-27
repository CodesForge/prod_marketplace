from authx import AuthX, AuthXConfig
from fastapi.security import HTTPBearer

from src.config.authx_service_settings import settings

class AuthConfig:
    _config = AuthXConfig(
        JWT_SECRET_KEY = settings.JWT_SECRET_KEY,
        JWT_ALGORITHM = settings.JWT_ALGORITHM,
        JWT_ACCESS_TOKEN_EXPIRES = settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        JWT_TOKEN_LOKATION = ["headers"]
    )
    
    secure = AuthX(config=_config)
    
class Bearer_scheme:
    bearer_scheme = HTTPBearer()
    
authx_service = AuthConfig.secure
bearer_scheme = Bearer_scheme.bearer_scheme