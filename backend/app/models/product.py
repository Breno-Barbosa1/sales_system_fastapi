from sqlalchemy import Column, Integer, String, Numeric

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    product_name = Column(String(50), nullable=False, unique=True)
    selling_price = Column(Numeric(10, 2), nullable=False)
    price_at_purchase = Column(Numeric(10, 2), nullable=False)
    stock_quantity = Column(Integer, nullable=False)

    def __repr__(self):
        return f"Product ID: {self.id} - Name: {self.product_name}"