from fastapi import FastAPI
from contextlib import asynccontextmanager

from src.infrastructure.db.session import DataBaseConfig
from src.infrastructure.db.models.admin import AdminsOrm


@asynccontextmanager
async def lifespan(app: FastAPI):
    await DataBaseConfig.connect()
    
    yield
    
    await DataBaseConfig.disconnect()
    
app = FastAPI(lifespan=lifespan)