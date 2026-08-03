from pydantic import BaseModel

class Address(BaseModel):
    street: str
    number: str
    neighborhood: str
    city: str
    state: str
    zip_code: str

class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    password: str
    email: str
    cpf: str
    address: Address