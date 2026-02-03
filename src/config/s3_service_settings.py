from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="src/env/s3_settings.env",
        env_file_encoding="utf-8"
    )
    
    ACCESS_KEY: str
    SECRET_KEY: str
    ENDPOINT_URL: str
    BUCKET_NAME: str
    
settings = Settings()
