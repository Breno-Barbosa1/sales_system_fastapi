from fastapi import FastAPI

from app.routers import employee_router
from app.database import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(employee_router.router)