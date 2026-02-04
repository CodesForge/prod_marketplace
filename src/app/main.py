"""FastAPI application entrypoint.

Exposes `app` for ASGI servers and manages DB connection lifecycle.
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.infrastructure.db.session import DataBaseConfig
from src.infrastructure.db.models.admin import AdminsOrm
from src.infrastructure.db.models.feedback import FeedbackOrm
from src.infrastructure.db.models.product import ProductOrm
from src.infrastructure.log.logger import logger
from src.presentation.api.routes.feedback import feedback_router
from src.presentation.api.routes.admin import admin_router
from src.presentation.api.routes.product import product_router
from src.service.admin_service import AdminService
from src.infrastructure.db.session import DataBaseConfig

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application startup/shutdown resources (DB connection)."""
    await DataBaseConfig.connect()
    logger.info("База данных подключена")
    async with DataBaseConfig.async_session_factory() as session:
        await AdminService.ensure_main_admin(session=session)
    yield
    await DataBaseConfig.disconnect()
    logger.info("База данных отключена")

app = FastAPI(lifespan=lifespan)

app.include_router(feedback_router)
app.include_router(admin_router)
app.include_router(product_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_credentials=False, 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", summary="Проверить состояние сайта", tags=["Health"])
async def health_check():
    return {"status": "ok"}