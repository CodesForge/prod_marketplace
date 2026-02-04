from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from src.presentation.schemas.product import ProductSchema
from src.infrastructure.db.models.product import Product
from src.infrastructure.log.logger import logger

class ProductRepository:
    @staticmethod
    async def add_product(
        session: AsyncSession,
        product: ProductSchema,
        link: str,
    ):
        try:    
            new_product = Product(
                title = product.title,
                description = product.description,
                price = product.price,
                s3_image_key = link
            )
            
            session.add(new_product)
            await session.commit()
            await session.refresh(new_product)
            logger.info(f"Товар {new_product.title} успешно добавлен")
            
            return {
                "status": "success",
                "message": "Товар успешно добавлен",
            }
        
        except ValueError as exc:
            await session.rollback()
            logger.exception("Имя файла или содержание файла является пустым")
            raise
        
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception(f"Ошибка базы данных: {exc}")
            raise
        
        except Exception as e:
            await session.rollback()
            logger.exception("Неизвестная ошибка при добавлении товара")
            raise