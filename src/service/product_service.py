from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, UploadFile, status

from src.infrastructure.cloud_storage.s3_service import s3client
from src.presentation.schemas.product import ProductSchema
from src.infrastructure.db.repository.product_repository import ProductRepository

class ProductService:
    @staticmethod
    async def add_product(
        session: AsyncSession,
        product: ProductSchema,
        file: UploadFile
    ):
        try:    
            link = await s3client.upload_photo_file(file=file)
            
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
