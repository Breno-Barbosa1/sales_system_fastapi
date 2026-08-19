from decimal import Decimal

from pydantic import BaseModel, ConfigDict

from app.schemas.product import ProductResponse


class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int

class SaleItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: Decimal
    product: ProductResponse

    model_config = ConfigDict(from_attributes=True)