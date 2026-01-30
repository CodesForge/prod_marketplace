from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession 


from src.infrastructure.db.models.admin import AdminsOrm
from src.infrastructure.log.logger import logger
from src.config.main_admin_settings import settings
from src.presentation.schemas.admin import AdminSchema

class AdminRepository:
    @staticmethod    
    async def add_admin(
        session: AsyncSession,
        username: str,
        password_hash: str,
    ):
        try:
            stmt = select(AdminsOrm).where(AdminsOrm.username == username)
            result = await session.execute(stmt)
            existing = result.scalar_one_or_none()

            if existing:
                logger.info(f"Админ {username} уже существует")
                return None

            admin = AdminsOrm(
                username = username,
                password = password_hash
            )
            session.add(admin)
            await session.commit()
            return admin
        except IntegrityError:
            await session.rollback()
            logger.warning("Главный админ был создан другим пользоватеплем")
            return None
        except SQLAlchemyError as exc:
            logger.exception(f"Ошибка БД при создании главного админа")
            await session.rollback()
            raise
        except Exception as exc:
            await session.rollback()
            logger.exception(f"Неизвестная ошибка при создании главного админа")
            raise
        
    # @staticmethod
    # async def login_admin(
    #     session: AsyncSession,
    #     admin: AdminSchema
    # ):
        
