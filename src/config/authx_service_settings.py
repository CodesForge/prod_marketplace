from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
    """Application settings loaded from environment variables.

    The settings are read from the OS environment and additionally from the
    `.env` file defined in `model_config`.
    """
    model_config = SettingsConfigDict(
        env_file="src/env/authx_service_settings.env",
        env_file_encoding="utf-8"
        )

    JWT_SECRET_KEY: str
    """Secret key used to sign JWT tokens."""
    JWT_ALGORITHM: str
    """JWT signing algorithm (e.g., HS256)."""
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int
    """Access token lifetime in minutes."""

settings = Settings()
