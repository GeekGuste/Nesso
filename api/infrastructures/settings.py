# core/settings.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import List

class Settings(BaseSettings):
    # Tes variables
    APP_NAME: str = "NESSO API"
    DEBUG: bool = False
    OPEN_API_KEY: str = None  # Clé API pour OpenAI, à définir dans .env

    # Listes : accepte un JSON '["http://localhost:3000"]' ou une liste python
    CORS_ORIGINS: List[str] = ["*"]

    # Où lire le .env en DEV (prod lira les vraies envs)
    model_config = SettingsConfigDict(
        env_file=".env",                # prends .env s’il existe
        env_file_encoding="utf-8",
        extra="ignore"                  # ignore les clés inconnues
    )

settings = Settings()  # singleton
