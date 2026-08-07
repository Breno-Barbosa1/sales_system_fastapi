from decimal import Decimal

from pydantic import BaseModel

class ProductCreate(BaseModel):
    product_name: str
    selling_price: Decimal
    price_at_purchase: Decimal
    stock_quantity: int