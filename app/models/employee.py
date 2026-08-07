from sqlalchemy import Column, Integer, String
from app.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), index=True, nullable=False)
    last_name = Column(String(50), index=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String(50), unique=True, index=True, nullable=False)
    cpf = Column(String(11), unique=True, index=True, nullable=False)

    street = Column(String(50), nullable=False)
    number = Column(Integer, nullable=False)
    city = Column(String(50), nullable=False)
    state = Column(String(2), nullable=False)
    zip_code = Column(Integer, nullable=False)
    complement = Column(String(50), nullable=False)

    def __repr__(self):
        return f"Employee ID: {self.id} - Employee Name: {self.first_name} + {self.last_name}"