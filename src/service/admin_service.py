from src.infrastructure.db.repository.admin_repository import AdminRepository
from src.infrastructure.secure.hash_service import HashService
from src.config.main_admin_settings import settings
from src.infrastructure.log.logger import logger
from src.presentation.schemas.admin import AdminSchema

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession 
from fastapi import HTTPException, status

class AdminService:
    @staticmethod
    async def ensure_main_admin(
        session: AsyncSession,
    ) -> None:
        
        result = await AdminRepository.add_admin(
            session=session, 
            username=settings.ADMIN_NAME,
        )

        if result is None:
            logger.info("Админ уже существует или создан другим человеком")
        else:
            logger.info(f"Главный админ {settings.ADMIN_NAME}")
            
    @staticmethod
    async def authenticate_admin(
        session: AsyncSession,
        admin: AdminSchema,
    ):
        try:
            
            return await AdminRepository.login_admin(session=session, admin=admin)
        
        except ValueError: 
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Неверное имя или пароль"
            )
        except SQLAlchemyError as exc:
            logger.error(f"Ошибка базы данных при входе админа: {exc}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Ошибка базы данных при входе в аккаунт"
            )
        except Exception as e:
            logger.error(f"Неизвестная ошибка при входе админа: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Неизвестная ошибка при входе в аккаунт"
            )
            
    @staticmethod
    async def get_admin(
        session: AsyncSession,
        limit: int,
        offset: int,
    ) -> dict:
        try:
            result = await AdminRepository.all_admin(
                session=session,
                limit=limit,
                offset=offset
            )
            return result
        except SQLAlchemyError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Ошибка базы данных при получении админов"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Неизвестная ошибка при получении админов"
            )
