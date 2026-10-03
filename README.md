# 🛒 Sales System FastAPI

A role-based sales management system built with **React** on the frontend and **FastAPI** on the backend. Employees can browse products and register sales, while administrators manage products, employees, and sales through a dedicated admin panel.

![Status](https://img.shields.io/badge/status-work%20in%20progress-yellow)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> ⚠️ **Work in progress.** This is a personal study project. Some features are incomplete, and the architecture may change as development continues.

---

## 📑 Table of Contents

- [Features](#-features)
- [User Roles](#-user-roles)
- [Pages](#-pages)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ✨ Features

### 👤 Employee

- View the product list
- Create and register sales
- View the home page with daily sales information

### 🛡️ Administrator

Administrators have everything employees have, plus access to the admin panel:

```text
Admin Panel
├── Products Management
├── Employees Management
└── Sales Management
```

| Section | Description |
|---|---|
| **Products** | Add, edit, and manage the product catalog |
| **Employees** | Manage employee accounts |
| **Sales** | Review and manage registered sales |

### ⚙️ General

- **Role-based access control** with two roles
- **Secure password hashing** using `pwdlib`
- **Pagination** for handling large lists of data efficiently

---

## 🔐 User Roles

| Role | Permissions |
|---|---|
| `role_employee` | View products and create sales |
| `role_admin` | Full access: employee, product, and sales management |

---

## 📄 Pages

| Page | Description | Access |
|---|---|---|
| **Home** | Displays the day's sales information | Employee, Admin |
| **Products** | Lists the available products | Employee, Admin |
| **Create Sale** | Registers a new sale | Employee, Admin |
| **Admin Panel** | Product, employee, and sales management | Admin only |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, JavaScript |
| **Backend** | Python, FastAPI |
| **Security** | pwdlib (password hashing) |

---

## 📁 Project Structure

```text
sales_system_fastapi/
├── frontend/    # React + JavaScript application
└── backend/     # Python + FastAPI application
```

> The exact structure may change as the project evolves.

## 🗺️ Roadmap

- [ ] Complete existing management features
- [ ] Improve sales management
- [ ] Expand product management
- [ ] Expand employee management
- [ ] Improve the admin panel
- [ ] Add additional validation and error handling
- [ ] Improve overall UI/UX
- [ ] Add setup and deployment documentation

---

## 📜 License

This project is currently a personal study project and does not have a license yet.
