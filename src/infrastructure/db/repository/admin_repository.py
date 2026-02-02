from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession 


from src.infrastructure.db.models.admin import AdminsOrm
from src.infrastructure.log.logger import logger
from src.config.main_admin_settings import settings
from src.presentation.schemas.admin import AdminSchema
from src.infrastructure.secure.hash_service import HashService
from src.infrastructure.secure.authx_service import authx_service

class AdminRepository:
    @staticmethod    
    async def add_main_admin(
        session: AsyncSession,
        username: str,
    ):
        try:
            stmt = select(AdminsOrm).where(AdminsOrm.username == username)
            result = await session.execute(stmt)
            existing = result.scalar_one_or_none()

            if existing:
                logger.info(f"Админ {username} уже существует")
                return None

            hashed = HashService.password_hash(settings.ADMIN_PASS)
            if not hashed:
                raise RuntimeError("Ошибка хеширования пароля")
            
            admin = AdminsOrm(
                username = username,
                password = hashed
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
        
    @staticmethod
    async def login_admin(
        session: AsyncSession,
        admin: AdminSchema
    ):
        try:
            stmt = select(AdminsOrm).where(AdminsOrm.username == admin.username)
            result = await session.execute(stmt)
            login_admin = result.scalar_one_or_none()
            
            if not login_admin:
                logger.warning("Админ не найден")
                raise ValueError("Неверные учетные данные")
            
            if HashService.verify_password(login_admin.password, admin.password):
                logger.info(f"Админ найден: {admin.username}")
                token = authx_service.create_access_token(uid=str(login_admin.id))
                return {"access_token": token, "message": "Админ успешно вошел в аккаунт"}
            
            
            logger.warning(f"Неверное имя пользователя или пароль")
            raise ValueError("Неверные учетные данные")
            
                
        except SQLAlchemyError as exc:
            logger.exception("Ошибка базы данных")
            raise
    
    @staticmethod
    async def all_admin(
        session: AsyncSession,
        limit: int,
        offset: int
    ) -> dict:
        try:    
            stmt = (
                select(AdminsOrm)
                .order_by(AdminsOrm.id.desc())
                .limit(limit=limit)
                .offset(offset=offset)
            )
            result = await session.execute(stmt)
            admins = result.scalars().all()

            counter_stmt = select(func.count()).select_from(AdminsOrm)
            total_result = await session.execute(counter_stmt)
            total = total_result.scalar_one_or_none() or 0

            

            if not admins:
                logger.info("Админы не найдены")
                return {
                    "message": "Админы не найдены",
                    "admins": [],
                    "total": 0
                }
            logger.info(f"Успешно найдено {len(admins)}")

            return {
                "message": f"Успешно найдено {len(admins)}",
                "admins": [
                    {
                        "id": admin.id,
                        "username": admin.username,
                        "created_at": admin.created_at
                    }
                    for admin in admins
                ],
                "total": total
            }
        except SQLAlchemyError as exc:
            logger.exception("Ошибка базы данных при получении админов")
            raise
        except Exception as e:
            logger.exception("Неизвестная ошибка при получении админов")
            raise

    @staticmethod
    async def add_admin(
        session: AsyncSession,
        admin: AdminSchema,
    ) -> dict:
        try:
            stmt = select(AdminsOrm).where(AdminsOrm.username == admin.username)
            result = await session.execute(stmt)
            existing_admin = result.scalar_one_or_none()

            if existing_admin:
                logger.warning(f"Админ: {existing_admin.username} уже существует")
                raise ValueError("Админ с таким именем уже существует")
            
            hashed = HashService.password_hash(admin.password)

            new_admin = AdminsOrm(
                username = admin.username,
                password = hashed
            )

            session.add(new_admin)
            await session.commit()
            await session.refresh(new_admin)
            logger.info("Админ успешно добавлен")
            return {
                "message": "Админ успешно добавлен",
                "username": new_admin.username,
                "id": new_admin.id,
                "created_at": new_admin.created_at
            }

        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("Ошибка БД при создании админа")
            raise
        except Exception as e:
            await session.rollback()
            logger.exception("Неизвестная ошибка при добавлении админа")
            raise
