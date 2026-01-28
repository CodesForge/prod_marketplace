from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
    """Database connection settings loaded from environment variables.

    Values are read from the OS environment and additionally from the `.env`
    file configured in `model_config`.
    """
    model_config = SettingsConfigDict(
        env_file="src/env/database_settings.env",
        env_file_encoding="utf-8"
    )

    DB_USER: str
    DB_PASS: str
    DB_NAME: str
    DB_HOST: str
    DB_PORT: str

    @property
    def DB_URL(self) -> str:
        """Build an async SQLAlchemy database URL for PostgreSQL (asyncpg)."""
        return (
            f"postgresql+asyncpg://"
            f"{self.DB_USER}:{self.DB_PASS}@"
            f"{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )
settings = Settings()