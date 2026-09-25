import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(case_sensitive=True)

    PROJECT_NAME: str = "DeltaX Prep — Associate Product Engineer 2027"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Database URL: defaults to local SQLite, uses PostgreSQL when DATABASE_URL is set (e.g. on Render)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./deltax_prep.db")
    
    # CORS Origins
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "*")

    @property
    def sqlalchemy_database_uri(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    @property
    def cors_origin_list(self) -> List[str]:
        if self.CORS_ORIGINS == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()
