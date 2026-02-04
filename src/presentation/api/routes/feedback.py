from fastapi import APIRouter, status, Query, Depends
from fastapi.security import HTTPAuthorizationCredentials
from authx import TokenPayload

from src.service.feedback_service import FeedbackService
from src.presentation.api.deps import SessionDep
from src.presentation.schemas.feedback import Feedback
from src.infrastructure.secure.authx_service import authx_service, bearer_scheme

feedback_router = APIRouter(prefix="/feedbacks", tags=["Feedback"])

@feedback_router.post(
    "/add", 
    status_code=status.HTTP_201_CREATED, 
    summary="Добавить обратную связь"
)
async def submit_feedback(
    feedback: Feedback,
    session: SessionDep

) -> dict:
    """Accept feedback from a user and store it.

    Saves the submitted feedback in the database and returns a short confirmation message.
    """
    return await FeedbackService.submit_feedback(session=session, feedback=feedback)

@feedback_router.get(
    "/get",
    summary="Получение всех обратных связей",
)
async def get_feedback(
    session: SessionDep,
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    _: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    payload: TokenPayload = Depends(authx_service.access_token_required),
) -> dict:
    return await FeedbackService.get_feedback(session=session, limit=limit, offset=offset)

