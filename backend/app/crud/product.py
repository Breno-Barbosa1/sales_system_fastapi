from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate

def get_products(db: Session):
    return db.query(Product).all()

def get_product_by_id(db: Session, product_id: int):
    return (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

def create_product(db: Session, product_data: ProductCreate):
    product = Product(
        product_name= product_data.product_name,
        selling_price= product_data.selling_price,
        price_at_purchase= product_data.price_at_purchase,
        stock_quantity= product_data.stock_quantity
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def update_product(db: Session, product_id: int, product_data: ProductCreate):
    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        return None

    product.product_name= product_data.product_name,
    product.selling_price= product_data.selling_price,
    product.price_at_purchase = product_data.price_at_purchase,
    product.stock_quantity = product_data.stock_quantity

    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        raise ValueError("Product not found")

    db.delete(product)
    db.commit()