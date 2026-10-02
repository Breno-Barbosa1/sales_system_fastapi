Sales System FastAPI

A work-in-progress sales management system built with React + JavaScript on the frontend and Python + FastAPI on the backend.

The project provides different functionality depending on the user's role: employees can view products and register sales, while administrators have access to management features for products, employees, and sales.

Status:
Work in progress. Some features are still incomplete and may change as the project evolves.


Features

Employee

Employees have access to the core sales functionality:

View the product list
Create/register sales
View the home page with daily sales information

Administrator

Administrators have access to an admin panel with management options for:

Products — manage products
Employees — manage employees
Sales — manage and review sales

The admin panel currently provides three main management sections:

Admin Panel

├── Products Management
├── Employees Management
└── Sales Management

Pages

The application currently includes the following main pages:

Home: Displays information about the day's sales.

Products: Displays the available products.

Create Sale: Allows an employee to create/register a sale.

Admin Panel: Provides administrators with access to product, employee, and sales management.


User Roles

The system currently has two user roles:

Role

Access

role_employee

View products and create sales

role_admin

Employee, product, and sales management



Tech Stack

Frontend

React
JavaScript

Backend

Python
FastAPI

Security

pwdlib — used for password hashing/encryption

Other Features

Pagination — used for handling lists of data and limiting the amount of information displayed or returned at once.


Project Structure

The project is divided into a frontend and backend:

sales_system_fastapi/

├── frontend/

│   └── React + JavaScript application

│

└── backend/

    └── Python + FastAPI application

The exact structure may change as the project develops.


Running the Project

Setup and installation instructions will be added as the project is finalized.

Backend: The backend is built with FastAPI and Python.

Frontend: The frontend is built with React and JavaScript.


Project Status

This project is currently under development and is being used as a study project.

Some functionality is still incomplete, and the application architecture and features may change as development continues.


Roadmap

Planned improvements and unfinished functionality may include:

Completing existing management features

Improving sales management

Expanding product management

Expanding employee management

Improving the admin panel

Adding additional validation and error handling

Improving the overall UI/UX


License

This project is currently a personal study project.
