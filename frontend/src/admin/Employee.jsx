import "./Employee.css"

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Employee() {
    const [employees, setEmployees] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const token = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/employees/?page=${page}&size=${pageSize}`, {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, 
            })

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const data = await response.json()
            setEmployees(data.items)
            setTotalPages(data.pages)
        } catch(error) {
            console.error("Error while fetching employees:", error)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
    })

    useEffect(() => {
        if (userRole !== "role_admin") {
            navigate('/');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        fetchEmployees();
    }, [page, navigate]);

    return (
        <div className="admin-employees-card">
            <nav className="nav-bar-admin-employees">
                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>
                <ul className="nav-links-admin-employees">
                    <li>
                        <a href="/products">Lista de Produtos</a>
                    </li>
                    <li>
                        <a href="/">Painel de Vendas</a>
                    </li>
                </ul>

                <div className="nav-actions-admin-employees">
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>

            </nav>

            <div className="admin-employees-dashboard">
                <div className="admin-employees-dashboard-content">
                    <div className="product-dashboard-header">
                        <div>
                            <h2>Painel de Funcionários</h2>
                            <p> Controle de Funcionários</p>
                        </div>
                    </div>

                    <table className="admin-employees-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Função</th>
                                <th>Ativo</th>
                                <th>Rua</th>
                                <th>Número</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>CEP</th>
                                <th>Complemento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.cpf}</td>
                                        <td>{employee.role === 'role_admin' ? 'Administrador' : 'Funcionário'}</td>
                                        <td>{employee.is_active ? "Sim" : "Não"}</td>
                                        <td>{employee.address.street}</td>
                                        <td>{employee.address.number}</td>
                                        <td>{employee.address.city}</td>
                                        <td>{employee.address.state}</td>
                                        <td>{employee.address.zip_code}</td>
                                        <td>{employee.address.complement}</td>
                                        <td>
                                            <button className="edit-btn" onClick={() => navigate(`/admin/employees/edit/${employee.id}`)}>
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Nenhum funcionário encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            ← Anterior
                        </button>
                        <span className="pagination-info">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            className="pagination-btn"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Próxima →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee