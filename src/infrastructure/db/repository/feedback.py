

from src.presentation.api.deps import SessionDep

class FeedbackRepository:
    @staticmethod
    async def add_feedback(
        session: SessionDep,
        
    ) -> dict:
        