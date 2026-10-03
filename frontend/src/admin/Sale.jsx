import "./Sale.css";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sale() {
    const [salesData, setSalesData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const hasSalesData = salesData.length > 0;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        if (userRole !== "role_admin") {
            navigate('/');
        }
    }, [userRole, navigate]);

    const handleCreateSale = () => {
        navigate('/create-sale');
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const fetchSalesData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/sales/by-date/?page=${page}&size=${pageSize}`, {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            })

            if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
            }

            const data = await response.json()
            setSalesData(data.items)
            setTotalPages(data.pages)
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    }

    const cancelSale = async (saleId) => {
        const token = localStorage.getItem("token")

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/sales/${saleId}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`},
            })

                if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
                }

                if (response.ok) {
                    fetchSalesData()
                }

                alert(`Venda cancelada! ID: ${saleId}`)
            } catch (error) {
                console.error('Error deleting sale:', error);
            }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        fetchSalesData()
    }, [page, navigate])

    return (
        <div className="admin-sale-card">
            <nav className="nav-bar-admin-sale">
                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>
                <ul className="nav-links-admin-sale">
                    <li><a href="/products">Lista de Produtos</a></li>
                    {localStorage.getItem("userRole") === "role_admin" && (
                        <li><a href="/admin">Painel Administrativo</a></li>
                    )}
                </ul>
                
                <div className="nav-actions-admin-sale">
                    <button className="logout-btn" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </nav>
            <div className="admin-sales-dashboard">
                <div className="admin-sales-dashboard-content">
                    <h2>Painel de Vendas</h2>
                    <table className="admin-sales-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID_Funcionário</th>
                                    <th>Data</th>
                                    <th>Produtos</th>
                                    <th>Valor Total</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.length > 0 ? (
                                    salesData.map((sale) => (
                                        <tr key={sale.id}>
                                            <td>{sale.id}</td>
                                            <td>{sale.employee_id}</td>
                                            <td>{new Date(sale.created_at).toLocaleDateString("pt-BR")}{" "}
                                                {new Date(sale.created_at).toLocaleTimeString("pt-BR")}</td>
                                            <td>
                                                {sale.sale_items.map((sale_item) => (
                                                    <div key={sale_item.id}>
                                                        <strong>{sale_item.product.product_name}</strong> - {sale_item.quantity} x R$ {sale_item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                R$ {sale.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </td>
                                            <td><button onClick={() => cancelSale(sale.id)}>Cancelar Venda</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>
                                            Nenhuma venda foi realizada hoje.
                                        </td>
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
                            {hasSalesData ? (
                                <button
                                    className="pagination-btn"
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    Próxima →
                                </button>
                            ) : (
                                <button className="pagination-btn" disabled>
                                    Próxima →
                                </button>
                            )}

                            <button className="create-sale-btn" onClick={handleCreateSale}>
                                + Nova Venda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Sale