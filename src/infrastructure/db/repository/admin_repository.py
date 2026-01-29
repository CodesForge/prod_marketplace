# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession

# from src.infrastructure.db.models.admin import AdminsOrm
# from src.config.main_admin_settings import settings
# from src.infrastructure.log.logger import logger

# class AdminRepository:
#     @staticmethod
#     async def add_main_admin(
#         session: AsyncSession
#     ) -> dict:
#         stmt = select(AdminsOrm).where(AdminsOrm.username == settings.ADMIN_NAME)
#         result = await session.execute(stmt)
#         admin = result.scalar_one_or_none()
        
#         if admin:
            
        
#         main_admin = AdminsOrm(
#             username = settings.ADMIN_NAME,
#             password = settings.ADMIN_PASS
#         )
#         session.add(main_admin)
#         await session.commit()