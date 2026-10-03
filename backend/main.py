from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from sqlalchemy.orm import Session

from app.database import Base, engine
from app.routers import employee_router, product_router, sale_router, login_router
from app.models.employee import Employee
from app.enums.employee_enum import EmployeeRole
from app.security import hash_password

def create_default_admin(db: Session):
    admin_email = "admin@mail.com"

    existing_user = db.query(Employee).filter(Employee.email == admin_email).first()

    if not existing_user:
        new_admin = Employee(
            first_name="Admin",
            last_name="User",
            password=hash_password("admin123"),
            email="admin@mail.com",
            cpf="00000000000",
            role=EmployeeRole.ADMIN.value,
            is_active=True,
            street="Street",
            number="0",
            city="City",
            state="PB",
            zip_code="00000000",
            complement="N/A"
        )
        db.add(new_admin)
        db.commit()
        print("Default admin created successfully.")
    else:
        print("Default admin already exists.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    with Session(engine) as db:
        create_default_admin(db)

    yield

app = FastAPI(lifespan=lifespan)

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

add_pagination(app)

app.include_router(employee_router.router)
app.include_router(product_router.router)
app.include_router(sale_router.router)
app.include_router(login_router.router)