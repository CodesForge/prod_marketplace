from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="src/env/main_admin_settings.env",
        env_file_encoding="utf-8"
    )
    
    ADMIN_NAME: str
    ADMIN_PASS: str
    
settings = Settings()