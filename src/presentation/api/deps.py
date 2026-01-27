from typing import Annotated, AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

from src.infrastructure.db.session import DataBaseConfig

class Dependencies:
    @staticmethod
    async def get_session() -> AsyncGenerator[AsyncSession, None]:
        async with DataBaseConfig.async_session_factory() as session:
            yield session
            
SessionDep = Annotated[AsyncSession, Depends(Dependencies.get_session)]
            

