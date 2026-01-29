from fastapi import APIRouter, status

from src.service.feedback_service import FeedbackService
from src.presentation.api.deps import SessionDep
from src.presentation.schemas.feedback import Feedback

feedback_router = APIRouter(prefix="/feedback", tags=["Feedback"])

@feedback_router.post("", status_code=status.HTTP_201_CREATED)
async def submit_feedback(
    feedback: Feedback,
    session: SessionDep

) -> dict:
    """Accept feedback from a user and store it.

    Saves the submitted feedback in the database and returns a short confirmation message.
    """
    return await FeedbackService.submit_feedback(session=session, feedback=feedback)
