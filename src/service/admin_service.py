from src.infrastructure.db.repository.admin_repository import AdminRepository
from src.infrastructure.secure.hash_service import HashService
from src.config.main_admin_settings import settings
from src.infrastructure.log.logger import logger

from sqlalchemy.ext.asyncio import AsyncSession 

class AdminService:
    @staticmethod
    async def ensure_main_admin(
        session: AsyncSession,
    ) -> None:
        hashed = HashService.password_hash(settings.ADMIN_PASS)
        if not hashed:
            raise RuntimeError("Ошибка хеширования пароля")
        
        result = await AdminRepository.add_admin(
            session=session, 
            username=settings.ADMIN_NAME, 
            password_hash=hashed
        )

        if result is None:
            logger.info("Админ уже существует или создан другим человеком")
        else:
            logger.info(f"Главный админ {settings.ADMIN_NAME}")
            
        
        