from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError, OperationalError

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
                contact = feedback.contact,
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
    
    @staticmethod
    async def all_feedback(
        session: AsyncSession,
        limit: int,
        offset: int
    ) -> dict:
        try:    
            stmt = (
                select(FeedbackOrm)
                .order_by(FeedbackOrm.id.desc())
                .limit(limit=limit)
                .offset(offset=offset)
            )
            result = await session.execute(stmt)
            feedbacks = result.scalars().all()

            counter_stmt = select(func.count()).select_from(FeedbackOrm)
            total_result = await session.execute(counter_stmt)
            total = total_result.scalar_one_or_none() or 0

            if not feedbacks:
                logger.info("Обратные связи не найдены")
                return {
                    "message": "Обратные связи не найдены",
                    "feedbacks": [],
                    "total": 0
                }

            logger.info(f"Обратные связи успешно найдены: {len(feedbacks)} записей")

            return {
                "message": f"Найдено обратных связей {len(feedbacks)}", 
                "feedbacks": [
                    {
                        "id": feedback.id,
                        "name": feedback.name,
                        "contact": feedback.contact,
                        "type_of_organization": feedback.type_of_organization,
                        "comment": feedback.comment,
                        "created_at": feedback.created_at
                    }
                    for feedback in feedbacks
                ], 
                "total": total
            }

        except SQLAlchemyError as exc:
            logger.exception("Ошибка базы данных при получении обратной связи")
            raise

        except Exception as e:
            logger.exception("Неизвестная ошибка при получении обратных связей")
            raise
