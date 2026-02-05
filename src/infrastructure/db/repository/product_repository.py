from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from src.presentation.schemas.product import ProductSchema
from src.infrastructure.db.models.product import ProductOrm
from src.infrastructure.log.logger import logger

class ProductRepository:
    @staticmethod
    async def add_product(
        session: AsyncSession,
        product: ProductSchema,
        link: str,
    ):
        try:    
            new_product = ProductOrm(
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

    @staticmethod
    async def all_products(
        session: AsyncSession,
        limit: int,
        offset: int
    ):
        try:
            stmt = (
                select(ProductOrm)
                .order_by(ProductOrm.id.desc())
                .limit(limit=limit)
                .offset(offset=offset)
            )
            result = await session.execute(stmt)
            products = result.scalars().all()

            count_stmt = select(func.count()).select_from(ProductOrm)
            total_result = await session.execute(count_stmt)
            total = total_result.scalar_one_or_none() or 0

            if not products:
                logger.info("Продукты не найдены")
                return {
                    "status": "success",
                    "products": [],
                    "total": total,
                    "message": "Продукты не найдены"
                }
                
            logger.info("Продукты успешно найдены")

            return {
                "status": "success",
                "products": [
                    {
                        "id": product.id,
                        "title": product.title,
                        "description": product.description,
                        "price": product.price,
                        "s3_image_key": product.s3_image_key,
                        "created_at": product.created_at
                    }
                for product in products],
                "total": total,
                "message": "Продукты успешно найдены"
            }
            
        except SQLAlchemyError as exc:
            logger.exception(f"Ошибка базы данных при получении товаров: {exc}")
            raise
        except Exception as exc:
            logger.exception(f"Неизвестная ошибка при получении товаров: {exc}")
            raise

    @staticmethod
    async def get_product_by_id(
        session: AsyncSession,
        id: int,
    ):
        try:    
            stmt = select(ProductOrm).where(ProductOrm.id == id)
            result = await session.execute(stmt)
            product = result.scalar_one_or_none()

            if not product:
                logger.warning(f"Товар с id: {id} не найден")
                raise ValueError(f"Товар с id: {id} не найден")

            logger.info("Продукт успешно получен")
            return {
                "message": "Продукт успешно получен",
                "product": {
                    "title": product.title,
                    "description": product.description,
                    "price": product.price,
                    "s3_image_key": product.s3_image_key,
                    "created_at": product.created_at
                },
                "status": "success"
            }
        except SQLAlchemyError as exc:
            logger.exception(f"Ошибка базы данных при получении товара: {exc}")
            raise
        
        except Exception as exc: 
            logger.exception(f"Неизвестная ошибка при получении товара: {exc}")
            raise
