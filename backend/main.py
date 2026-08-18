from fastapi import FastAPI

from app.database import Base, engine
from app.routers import employee_router, product_router, sale_router, login_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router.router)
app.include_router(product_router.router)
app.include_router(sale_router.router)
app.include_router(login_router.router)