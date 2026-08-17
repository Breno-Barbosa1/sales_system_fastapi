from enum import Enum

class EmployeeRole(str, Enum):
    EMPLOYEE = "role_employee"
    ADMIN = "role_admin"