import './Home.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [salesData, setSalesData] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login');
            return;
        }

        const fetchSalesData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/sales", {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                })

                if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
                }

                const data = await response.json()
                setSalesData(data)

            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        }
        fetchSalesData()

    }, [])

    return (
        <div className="home-card">
            <nav className="nav-bar">
                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>
                
                <ul className="nav-links">
                    <li><a href="#produtos">Produtos</a></li>
                    <li><a href="#vendas">Vendas</a></li>
                </ul>
                
                <div className="nav-actions">
                    <button className="logout-btn" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </nav>
            
            <div className="sales-dashboard">
                <div className="dashboard-content">
                    <h2>Painel de Vendas</h2>
                    <table className="vendas-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID_Funcionário</th>
                                    <th>Data</th>
                                    <th>Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.map((sale) => (
                                    <tr key={sale.id}>
                                        <td>{sale.id}</td>
                                        <td>{sale.employee_id}</td>
                                        <td>{sale.created_at}</td>
                                        <td>
                                            {sale.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </tr>
                                ))}
                                {salesData.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>
                                            Nenhuma venda encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    );
}

export default Home;