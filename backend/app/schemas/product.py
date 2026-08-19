from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ProductCreate(BaseModel):
    product_name: str
    selling_price: Decimal
    price_at_purchase: Decimal
    stock_quantity: int

class ProductResponse(BaseModel):
    id: int
    product_name: str
    selling_price: Decimal
    stock_quantity: int

    model_config = ConfigDict(from_attributes=True)