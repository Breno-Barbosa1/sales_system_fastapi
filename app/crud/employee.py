from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from app.security import hash_password

def get_employees(db: Session):
    return db.query(Employee).all()

def get_employee_by_id(db: Session, employee_id: int):
    return (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

def get_employee_by_email(db: Session, employee_email: str):
    return (
        db.query(Employee)
        .filter(Employee.email == employee_email)
        .first()
    )

def create_employee(db: Session, employee_data: EmployeeCreate):
    employee = Employee(
        first_name= employee_data.first_name,
        last_name= employee_data.last_name,
        password=  hash_password(employee_data.password),
        email= employee_data.email,
        cpf= employee_data.cpf,
        street= employee_data.address.street,
        number= employee_data.address.number,
        city= employee_data.address.city,
        state= employee_data.address.state,
        zip_code= employee_data.address.zip_code,
        complement= employee_data.address.complement
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def update_employee(db: Session, employee_id: int, employee_data: EmployeeUpdate):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if employee is None:
        return None

    employee.first_name= employee_data.first_name,
    employee.last_name= employee_data.last_name,
    employee.password=  hash_password(employee_data.password),
    employee.email= employee_data.email,
    employee.street= employee_data.address.street,
    employee.number= employee_data.address.number,
    employee.city= employee_data.address.city,
    employee.state= employee_data.address.state,
    employee.zip_code= employee_data.address.zip_code,
    employee.complement= employee_data.address.complement

    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee