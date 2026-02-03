from datetime import datetime
from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.db.session import Base



class Product(Base):
    __tablename__ = "products"
    
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    title: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(2000), nullable=False)
    price: Mapped[float] = mapped_column(nullable=False)
    s3_image_key: Mapped[str] = mapped_column(String(500), nullable=False)
    creted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())