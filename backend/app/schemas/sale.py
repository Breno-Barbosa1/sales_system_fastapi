from datetime import datetime
from decimal import Decimal
from typing import List

from pydantic import BaseModel, ConfigDict

from app.schemas.sale_item import SaleItemCreate, SaleItemResponse

class SaleCreate(BaseModel):
    employee_id: int
    sale_items: List[SaleItemCreate]

class SaleResponse(BaseModel):
    id: int
    employee_id: int
    created_at: datetime
    total_amount: Decimal
    sale_items: List[SaleItemResponse]

    model_config = ConfigDict(from_attributes=True)