from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base
from app.enums.employee_enum import EmployeeRole

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), index=True, nullable=False)
    last_name = Column(String(50), index=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String(50), unique=True, index=True, nullable=False)
    cpf = Column(String(11), unique=True, index=True, nullable=False)
    role = Column(String(20), nullable=False, default=EmployeeRole.EMPLOYEE.value)
    is_active = Column(Boolean, nullable=False, default=True)

    street = Column(String(50), nullable=False)
    number = Column(Integer, nullable=False)
    city = Column(String(50), nullable=False)
    state = Column(String(2), nullable=False)
    zip_code = Column(Integer, nullable=False)
    complement = Column(String(50), nullable=False)

    def __repr__(self):
        return f"Employee ID: {self.id} - Employee Name: {self.first_name} + {self.last_name}"

    @property
    def address(self):
        return {
            "street": self.street,
            "number": self.number,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "complement": self.complement
        }