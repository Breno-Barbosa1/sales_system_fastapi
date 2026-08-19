from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import Page
from sqlalchemy.orm import Session

from app.auth.dependencies import require_admin, get_current_user
from app.crud.employee import get_employees, get_employee_by_id, create_employee, update_employee, get_employee_by_email
from app.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeeResponse

router = APIRouter(prefix="/api/v1/employees", tags=["employees"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=Page[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    employees = get_employees(db)
    return employees

@router.get("/{employee_id}")
def list_employee_by_id(employee_id: int, db: Session = Depends(get_db)):
    employee = get_employee_by_id(db, employee_id)

    if employee is None:
        raise HTTPException(
            status_code = 404,
            detail= f"Employee not found for ID: {employee_id}"
        )

    return employee

@router.get("/email/{employee_email}")
def list_employee_by_email(employee_email: str, db: Session = Depends(get_db)):
    employee = get_employee_by_email(db, employee_email)

    if employee is None:
        raise HTTPException(
            status_code = 404,
            detail= f"Employee not found for email: {employee_email}"
        )

    return employee

@router.post("/", dependencies=[Depends(require_admin)])
def create_employee_data(employee_data: EmployeeCreate, db: Session = Depends(get_db)):
    existing_email = (
        db.query(Employee)
        .filter(Employee.email == employee_data.email)
        .first()
    )

    existing_cpf = (
        db.query(Employee)
        .filter(Employee.cpf == employee_data.cpf)
        .first()
    )

    if existing_email or existing_cpf:
        raise HTTPException(
            status_code = 409,
            detail= "Someone is already registered with this email or cpf!"
        )

    employee = create_employee(db, employee_data)

    return employee

@router.put("/{employee_id}", dependencies=[Depends(require_admin)])
def update_employee_data(employee_data: EmployeeUpdate, employee_id: int, db: Session = Depends(get_db)):
    employee = update_employee(db, employee_id, employee_data)
    return employee