import "./EmployeeEdit.css"

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function EmployeeEdit() {
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        cpf: "",
        role: "",
        address: {
            street: "",
            number: "",
            city: "",
            state: "",
            zip_code: "",
            complement: ""
        }
    })
    const employeeId = window.location.pathname.split("/").pop();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const navigate = useNavigate();

    const fetchEmployee = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/employees/${employeeId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const data = await response.json();
            setEmployee(data);
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    };

    const handleUpdateEmployee = async (e) => {
        e.preventDefault()

        const employeeData = { 
            first_name: employee.first_name, 
            last_name: employee.last_name, 
            password: employee.password,
            email: employee.email, 
            is_active: employee.is_active,
            address: {
                street: employee.street,
                number: employee.number,
                city: employee.city,
                state: employee.state,
                zip_code: employee.zip_code,
                complement: employee.complement,
            }
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/employees/${employeeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(employeeData)
            });

            if (response.status === 422) {
                alert(`Erro ao atualizar funcionário! ID: ${employeeId}`);
                return;
            }

            alert(`Funcionário atualizado com sucesso! ID: ${employeeId}`)
            navigate("/admin/employees")
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    }

    useEffect(() => {
        if (userRole !== "role_admin") {
            navigate("/")
        }
    }, [userRole, navigate])

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        fetchEmployee()
    }, []);

    return (
        <div className="employee-edit-card">
            <nav className="nav-bar-employee-edit">
                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>
                <ul className="nav-links-employee-edit">
                    <li>
                        <a href="/products">Lista de Produtos</a>
                    </li>

                    <li>
                        <a href="/">Painel de Vendas</a>
                    </li>
                </ul>
                <div className="nav-actions-employee-edit">
                    <button className="logout-btn">
                        Sair
                    </button>
                </div>
            </nav>
            <div className="employee-edit-dashboard">
                <div className="employee-edit-content">
                    <div className="employee-edit-header">
                        <h2>Editar Funcionário</h2>
                        <p>Atualize as informações do funcionário</p>
                    </div>
                    <div className="employee-edit-form-container">
                        <form className="employee-edit-form" onSubmit={handleUpdateEmployee}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nome</label>
                                    <input type="text" value={employee?.first_name || ""} onChange={(e) => setEmployee({...employee, first_name: e.target.value})} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Sobrenome</label>
                                        <input
                                            type="text"
                                            value={
                                                employee?.last_name != null
                                                    ? employee.last_name
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                setEmployee({...employee, last_name: e.target.value});
                                            }}
                                        />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={
                                            employee?.email != null
                                                ? employee.email
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setEmployee({...employee, email: e.target.value});
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input
                                        type="password"
                                        value={
                                            employee?.password != null
                                                ? employee.password
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setEmployee({...employee, password: e.target.value});
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rua</label>
                                    <input
                                        type="text"
                                        value={employee?.street || ""}
                                        onChange={(e) => {
                                            setEmployee({
                                                ...employee,
                                                street: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Número</label>
                                    <input
                                        type="text"
                                        value={employee?.number || ""}
                                        onChange={(e) => {
                                            setEmployee({
                                                ...employee,
                                                number: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Cidade</label>
                                    <input
                                        type="text"
                                        value={employee?.city || ""}
                                        onChange={(e) => {
                                            setEmployee({
                                                ...employee,
                                                city: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Estado</label>
                                    <input
                                        type="text"
                                        value={employee?.state || ""}
                                        onChange={(e) => {
                                            setEmployee({
                                                ...employee,
                                                state: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>CEP</label>
                                    <input
                                        type="text"
                                        value={employee?.zip_code || ""}
                                        onChange={(e) => {
                                            setEmployee({
                                                ...employee,
                                                zip_code: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Complemento</label>
                                    <input
                                        type="text"
                                        value={employee?.complement || ""}
                                        onChange={(e) => {
                                            setEmployee({
                                                ...employee,
                                                complement: e.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => navigate("/admin/employees")}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="save-btn"
                                    >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeEdit;