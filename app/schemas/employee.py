from pydantic import BaseModel

class Address(BaseModel):
    street: str
    number: int
    city: str
    state: str
    zip_code: int
    complement: str

class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    password: str
    email: str
    cpf: str
    address: Address

class EmployeeUpdate(BaseModel):
    first_name: str
    last_name: str
    password: str
    email: str
    address: Address