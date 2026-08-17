from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int

class SaleItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: Decimal

    model_config = ConfigDict(from_attributes=True)