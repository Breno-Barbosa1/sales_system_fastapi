from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product

from app.crud.product import get_products, get_product_by_id, create_product, update_product, delete_product
from app.schemas.product import ProductCreate

router = APIRouter(prefix="/api/v1/products", tags=["products"])

@router.get("/")
def list_products(db: Session = Depends(get_db)):
    products = get_products(db)
    return products

@router.get("/{product_id}")
def list_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code = 404,
            detail= "Product not found"
        )

    return product

@router.post("/")
def create_product_data(product_data: ProductCreate, db: Session = Depends(get_db)):
    existing_name = (
        db.query(Product)
        .filter(Product.product_name == product_data.product_name)
        .first()
    )

    if existing_name:
        raise HTTPException(
            status_code = 409,
            detail= "Product with this name already exists!"
        )

    product = create_product(db, product_data)

    return product

@router.put("/{product_id}")
def update_product_data(product_data: ProductCreate, product_id: int, db: Session = Depends(get_db)):
    product = update_product(db, product_id, product_data)
    return product

@router.delete("/{product_id}",  status_code=status.HTTP_204_NO_CONTENT)
def delete_product_data(product_id: int, db: Session = Depends(get_db)):
    delete_product(db, product_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)