from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud.employee import get_employee_by_email
from app.database import get_db
from app.schemas.auth import TokenResponse, LoginRequest
from app.security import verify_password
from app.auth.jwt import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["login"])

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):

    employee = get_employee_by_email(db, login_data.email)

    if not employee:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
            login_data.password,
            employee.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token({
        "sub": str(employee.id),
        "email": employee.email
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }