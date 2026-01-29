from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from src.presentation.schemas.feedback import Feedback
from src.infrastructure.db.models.feedback import FeedbackOrm
from src.infrastructure.log.logger import logger

class FeedbackRepository:
    """Persistence layer for feedback submissions."""
    @staticmethod
    async def add_feedback(
        session: AsyncSession,
        feedback: Feedback
    ) -> dict:
        """Insert a feedback row and return a small response payload."""
        try:
            new_feedback = FeedbackOrm(
                name = feedback.name,
                email = feedback.email,
                phone = feedback.phone,
                type_of_organization = feedback.type_of_organization,
                comment = feedback.comment
            )
            session.add(new_feedback)
            await session.commit()
            await session.refresh(new_feedback)
            logger.info("Обратная связь успешно отправлена")
            return {
                "message": "обратная связь отправлена", 
                "id": new_feedback.id
            }
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception(f"Не удалось отправить обратную связь, ошибка: {exc}")
            raise 
        except Exception as e:
            await session.rollback()
            logger.exception(f"Не удалось отправить обратную связь, ошибка: {e}")
            raise
