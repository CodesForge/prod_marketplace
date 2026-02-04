from fastapi import APIRouter, File, UploadFile, Depends, Form
from fastapi.security import HTTPAuthorizationCredentials
from authx import TokenPayload\

from src.infrastructure.secure.authx_service import authx_service, bearer_scheme
from src.presentation.api.deps import SessionDep
from src.presentation.schemas.product import ProductSchema
from src.service.product_service import ProductService

product_router = APIRouter(prefix="/product", tags=["Product"])

@product_router.post("/add-product", summary="Добавить продукт")
async def add_product(
    session: SessionDep,
    title: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    file: UploadFile = File(...)
):
    return await ProductService.add_product(
        session=session,
        title=title,
        description=description,
        price=price,
        file=file
    )

