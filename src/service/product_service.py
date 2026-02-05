from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, UploadFile, status, Form

from src.infrastructure.cloud_storage.s3_service import s3client
from src.presentation.schemas.product import ProductSchema
from src.infrastructure.db.repository.product_repository import ProductRepository

class ProductService:
    @staticmethod
    async def add_product(
        session: AsyncSession,
        title: str,
        description: str,
        price: float,
        file: UploadFile
    ):
        try:    
            link = await s3client.upload_photo_file(file=file)

            product = ProductSchema(
                title=title,
                description=description,
                price=price
            )
            
            return await ProductRepository.add_product(
                session=session,
                product=product,
                link=link
            )
        
        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(exc)
            )
        
        except SQLAlchemyError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ошибка базы данных: {exc}"
            )
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Неизвестная ошибка при добавлении товара: {str(exc)}"
            )

    @staticmethod
    async def all_products(
        session: AsyncSession,
        limit: int,
        offset: int
    ): 
        try:
            return await ProductRepository.all_products(
                session=session,
                limit=limit,
                offset=offset
            )

        except SQLAlchemyError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ошибка базы данных при получении продуктов: {exc}"
            )
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Неизвестная ошибка при получении товаров: {exc}"
            )

    @staticmethod
    async def get_product_by_id(
        session: AsyncSession,
        id: int
    ):
        try:
            return await ProductRepository.get_product_by_id(
                session=session,
                id=id
            )

        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(exc)
            )
        except SQLAlchemyError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ошибка базы данных при получении товара: {exc}"
            )
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Неизвестная ошибка при получении товара: {exc}"
            )