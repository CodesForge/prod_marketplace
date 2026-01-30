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

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    DB_HOST: str
    DB_PORT: str

    @property
    def DB_URL(self) -> str:
        """Build an async SQLAlchemy database URL for PostgreSQL (asyncpg)."""
        return (
            f"postgresql+asyncpg://"
            f"{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@"
            f"{self.DB_HOST}:{self.DB_PORT}/{self.POSTGRES_DB}"
        )
settings = Settings()