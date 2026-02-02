from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, func, DateTime
from datetime import datetime

from src.infrastructure.db.session import Base

class AdminsOrm(Base):
    """Admin account ORM model.

    Stores credentials for admin users. The `password` field is expected to
    contain a hashed value (not a raw password).
    """
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(256)) #так много т к хеширование
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
