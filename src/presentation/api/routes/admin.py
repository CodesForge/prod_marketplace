from src.presentation.api.deps import SessionDep
from src.presentation.schemas.admin import AdminSchema
from src.service.admin_service import AdminService



from fastapi import APIRouter

admin_router = APIRouter(prefix="/admin", tags=["Admin"])

@admin_router.post("/login", summary="Войти в аккаунт")
async def login_admin(
    session: SessionDep,
    admin: AdminSchema
):
    return await AdminService.authenticate_admin(session=session, admin=admin)

