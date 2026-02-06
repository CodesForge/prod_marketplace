from fastapi import APIRouter, File, UploadFile, Depends, Form, Query
from fastapi.security import HTTPAuthorizationCredentials
from authx import TokenPayload

from src.infrastructure.secure.authx_service import authx_service, bearer_scheme
from src.presentation.api.deps import SessionDep
from src.presentation.schemas.product import ProductSchema
from src.service.product_service import ProductService

product_router = APIRouter(prefix="/products", tags=["Product"])

@product_router.post("/add", summary="Добавить продукт")
async def add_product(
    session: SessionDep,
    _: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    payload: TokenPayload = Depends(authx_service.access_token_required),
    title: str = Form(...),
    description: str = Form(...),
    price: str = Form(...),
    file: UploadFile = File(...)
):
    return await ProductService.add_product(
        session=session,
        title=title,
        description=description,
        price=price,
        file=file
    )

@product_router.get("/get", summary="Получить все продукты")
async def get_all_products(
    session: SessionDep,
    limit: int = Query(16, ge=1, le=40),
    offset: int = Query(0, ge=0)
):
    return await ProductService.all_products(
        session=session,
        limit=limit,
        offset=offset
    )

@product_router.get("/get-product", summary="Получить продукт по айди")
async def get_product_by_id(
    session: SessionDep,
    id: int = Query(1, ge=1)
):
    return await ProductService.get_product_by_id(
        session=session,
        id=id
    )

# @product_router.get("/get-animal", summary="Отфильтровать товары по животному")
# async def get_all_animal(
#     sesseon: SessionDep,
#     animal_type: str = Query(min_length=2, max_length=20)
# ):
#     return await ProductService.get_all_animal(
#         session=sesseon,
#         animal_type=animal_type
#     )