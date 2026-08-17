from fastapi import FastAPI

from app.database import Base, engine
from app.routers import employee_router, product_router, sale_router, login_router

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(employee_router.router)
app.include_router(product_router.router)
app.include_router(sale_router.router)
app.include_router(login_router.router)