from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from src.infrastructure.db.repository.feedback import FeedbackRepository
from src.presentation.schemas.feedback import Feedback
from src.infrastructure.log.logger import logger


class FeedbackService:
    """Provide business logic for feedback submission."""
    @staticmethod
    async def submit_feedback(
        session: AsyncSession,
        feedback: Feedback
    ) -> dict:
        """Submit a feedback entry and return a user-facing confirmation message.

Args:
    session: SQLAlchemy async database session.
    feedback: Feedback payload validated by the API layer.

Returns:
    A dict with a success message (e.g. for JSON response).

Raises:
    HTTPException: If a database error occurs (500) or an unexpected error occurs (500).
"""
        try:
            saved = await FeedbackRepository.add_feedback(
                session=session,
                feedback=feedback
            )
            logger.info("Обратная связь отправлена")
            return {"message": "Обратная связь успешно отправлена"}
        except SQLAlchemyError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка БД при отправке обратной связи"
            ) from exc
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Неожиданная ошибка при отправке обратной связи"
            ) from e
