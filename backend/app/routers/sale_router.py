from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi_pagination import Page, Params
from sqlalchemy.orm import Session

from app.auth.dependencies import require_admin, get_current_user
from app.crud.sale import get_sales, get_sale_by_id, create_sale, delete_sale, get_sales_by_day
from app.database import get_db
from app.schemas.sale import SaleCreate, SaleResponse

router = APIRouter(prefix="/api/v1/sales", tags=["Sales"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=Page[SaleResponse])
def list_sales(db: Session = Depends(get_db)):
    sales = get_sales(db)
    return sales

@router.get("/{sale_id}", response_model=SaleResponse)
def list_sale_by_id(sale_id: int, db: Session = Depends(get_db)):
    sale = get_sale_by_id(db, sale_id)

    if sale is None:
        raise HTTPException(
            status_code = 404,
            detail= "Sale not found"
        )

    return sale

@router.get("/by-date/", response_model=Page[SaleResponse])
def list_sale_by_day(target_date: Optional[date] = None, db: Session = Depends(get_db), params: Params = Depends()):
    if target_date is None:
        target_date = date.today()

    sales = get_sales_by_day(db, target_date, params)
    return sales

@router.post("/", response_model=SaleResponse)
def create_sale_data(sale_data: SaleCreate, db: Session = Depends(get_db)):

    sale = create_sale(db, sale_data)

    return sale

@router.delete("/{sale_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
def delete_sale_data(sale_id: int, db: Session = Depends(get_db)):
    delete_sale(db, sale_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)