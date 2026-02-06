from datetime import datetime
from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.db.session import Base



class ProductOrm(Base):
    __tablename__ = "products"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(2000), nullable=False)
    price: Mapped[str] = mapped_column(nullable=False)
    s3_image_key: Mapped[str] = mapped_column(String(500), nullable=False)
    wb_url: Mapped[str] = mapped_column(String(50), nullable=False)
    ozon_url: Mapped[str] = mapped_column(String(50), nullable=False)
    market_url: Mapped[str] = mapped_column(String(50), nullable=False)
    animal_type: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
