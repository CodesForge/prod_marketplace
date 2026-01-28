from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from src.config.database_settings import settings

class Base(DeclarativeBase):
    """Base class for all ORM models in the application."""
    pass

class DataBaseConfig:
    """Database engine and session factory configuration.

    Provides an async SQLAlchemy engine, an async session factory, and helper
    methods to initialize and dispose database resources.
    """
    async_engine = create_async_engine(url=settings.DB_URL, echo=True)

    async_session_factory = async_sessionmaker(
        async_engine, 
        class_=AsyncSession, 
        expire_on_commit=False
    )

    @classmethod
    async def connect(cls):
        """Initialize database resources on application startup.

        Create all tables registered in `Base.metadata` using an async engine.
        """
        async with cls.async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    @classmethod
    async def disconnect(cls):
        """Dispose the async engine and release pooled connections."""
        await cls.async_engine.dispose()
