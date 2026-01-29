from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.db.session import Base

class FeedbackOrm(Base):
    """Feedback submission ORM model.

    Stores contact details and a message from the user.
    """
    __tablename__ = "feedback"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(32))
    contact: Mapped[str] = mapped_column(String(32), nullable=False, unique=True)
    type_of_organization: Mapped[str] = mapped_column(String(128), nullable=False)
    comment: Mapped[str] = mapped_column(String(512), nullable=False)
