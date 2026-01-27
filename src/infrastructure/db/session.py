from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from src.config.database_settings import settings

class Base(DeclarativeBase):
    pass

class DataBaseConfig:
    async_engine = create_async_engine(url=settings.DB_URL, echo=True)
    
    async_session_factory = async_sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)
    
    @classmethod
    async def connect(cls):
        async with cls.async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            
    @classmethod
    async def disconnect(cls):
        await cls.async_engine.dispose()
        
        