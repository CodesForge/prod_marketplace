from src.presentation.api.deps import SessionDep
from src.presentation.schemas.admin import AdminSchema
from src.service.admin_service import AdminService
from src.infrastructure.secure.authx_service import authx_service, bearer_scheme

from fastapi import APIRouter, Query, Depends
from fastapi.security import HTTPAuthorizationCredentials
from authx import TokenPayload

admin_router = APIRouter(prefix="/admins", tags=["Admin"])

@admin_router.post("/login", summary="Войти в аккаунт")
async def login_admin(
    session: SessionDep,
    admin: AdminSchema
):
    return await AdminService.authenticate_admin(session=session, admin=admin)

@admin_router.get("/get", summary="Получить всех админов")
async def get_admins(
    session: SessionDep,
    limit: int = Query(10, ge=0, le=15),
    offset: int = Query(0, ge=0),
    _: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    payload: TokenPayload = Depends(authx_service.access_token_required)
):    
    return await AdminService.get_admin(
        session=session,
        limit=limit,
        offset=offset
    )

@admin_router.post("/add", summary="Добавить админа")
async def add_admin(
    session: SessionDep,
    admin: AdminSchema,
    _: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    payload: TokenPayload = Depends(authx_service.access_token_required)
):
    return await AdminService.add_admin(
        session=session,
        admin=admin
    )