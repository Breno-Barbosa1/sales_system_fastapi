import "./AdminPanel.css";

import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    return (
        <div className="admin-panel">
            <nav className="nav-bar-admin-panel">
                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>
                <ul className="nav-links-admin-panel">
                    <li>
                        <a href="/products">Lista de Produtos</a>
                    </li>

                    <li>
                        <a href="/">Painel de Vendas</a>
                    </li>
                </ul>

                <div className="nav-actions-admin-panel">
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>

            </nav>
            <div className="admin-content">

                <div className="admin-header">
                    <h1>Painel Administrativo</h1>
                </div>

                <div className="admin-actions">

                    <button
                        className="admin-button"
                        onClick={() => navigate("/admin/products")}
                    >
                        Gerenciar Produtos
                    </button>

                    <button
                        className="admin-button"
                        onClick={() => navigate("/admin/sales")}
                    >
                        Gerenciar Vendas
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminPanel;