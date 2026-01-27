from fastapi import FastAPI
from contextlib import asynccontextmanager

from src.infrastructure.db.session import DataBaseConfig
from src.infrastructure.db.models.admin import AdminsOrm
from src.infrastructure.log.logger import logger


@asynccontextmanager
async def lifespan(app: FastAPI):
    await DataBaseConfig.connect()
    logger.info("База данных поключена")
    yield
    
    await DataBaseConfig.disconnect()
    logger.info("База данных отключена")
    
app = FastAPI(lifespan=lifespan)