from pydantic import BaseModel, ConfigDict

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
    is_active: bool

class EmployeeResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    cpf: str
    address: Address
    is_active: bool

    model_config = ConfigDict(from_attributes=True)