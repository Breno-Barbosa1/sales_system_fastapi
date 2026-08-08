from sqlalchemy import Column, Integer, Numeric, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship

from app.database import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    total_amount = Column(Numeric(10, 2), nullable=False)

    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)

    employee = relationship("Employee")

    sale_items = relationship(
        "SaleItem",
        back_populates="sale",
        cascade="all, delete-orphan"
    )