from decimal import Decimal
from datetime import date, datetime, timedelta

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.sale import Sale
from app.models.sale_item import SaleItem
from app.schemas.sale import SaleCreate

from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate

def get_sales(db: Session) -> Page[Sale]:
    return paginate(db, db.query(Sale).order_by(Sale.created_at))

def get_sale_by_id(db: Session, sale_id: int):
    return (
        db.query(Sale)
        .filter(Sale.id == sale_id)
        .first()
    )

def get_sales_by_day(db: Session, target_date: date):
    day_start = datetime.combine(target_date, datetime.min.time())
    day_end = day_start + timedelta(days=1)

    return (
        db.query(Sale)
        .filter(Sale.created_at >= day_start)
        .filter(Sale.created_at < day_end)
        .all()
    )

def create_sale(db: Session, sale_data: SaleCreate):
    total = Decimal("0.00")
    sale_items = []

    for item in sale_data.sale_items:
        product = (db.query(Product)
           .filter(Product.id == item.product_id)
           .first())

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product not found for this ID: {item.product_id}"
            )

        if product.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock quantity for product with ID: {item.product_id}"
            )

        price = item.quantity * product.selling_price
        total += price

        product.stock_quantity -= item.quantity

        sale_items.append(
            SaleItem(
                product_id=product.id,
                quantity=item.quantity,
                price = product.selling_price
            )
        )

    sale = Sale(
        employee_id=sale_data.employee_id,
        total_amount=total,
        sale_items=sale_items
    )

    db.add(sale)
    db.commit()
    db.refresh(sale)

    return sale

def delete_sale(db: Session, sale_id: int):
    sale = db.query(Sale).filter(Sale.id == sale_id).first()

    if sale is None:
        raise ValueError("Sale not found")

    db.delete(sale)
    db.commit()