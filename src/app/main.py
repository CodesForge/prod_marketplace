"""FastAPI application entrypoint.

Exposes `app` for ASGI servers and manages DB connection lifecycle.
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.infrastructure.db.session import DataBaseConfig
from src.infrastructure.db.models.admin import AdminsOrm
from src.infrastructure.db.models.feedback import FeedbackOrm
from src.infrastructure.log.logger import logger

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application startup/shutdown resources (DB connection)."""
    await DataBaseConfig.connect()
    logger.info("База данных поключена")
    yield
    await DataBaseConfig.disconnect()
    logger.info("База данных отключена")
app = FastAPI(lifespan=lifespan)


