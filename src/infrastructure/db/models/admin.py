from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, func, DateTime
from datetime import datetime

from src.infrastructure.db.session import Base

class AdminsOrm(Base):
    __tablename__ = "admins"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(32), unique=True)
    password: Mapped[str] = mapped_column(String(256)) #так много т к хеширование
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())