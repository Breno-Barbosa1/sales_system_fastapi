import "./Product.css"

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Product() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const fetchProducts = async () => {
       try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/products/?page=${page}&size=${pageSize}`, {
                method: "GET",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, 
            })

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const data = await response.json()
            setProducts(data.items)
            setTotalPages(data.pages)
        } catch (error){
            console.log("Error fetching products:", error)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [page, navigate]);

    return (
        <div className="home-card">

            {/* NAVBAR */}
            <nav className="nav-bar">

                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>

                <ul className="nav-links">
                    <li>
                        <a href="/products">Produtos</a>
                    </li>

                    <li>
                        <a href="/">Vendas</a>
                    </li>
                </ul>

                <div className="nav-actions">
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>

            </nav>

            <div className="sales-dashboard">
                <div className="dashboard-content">
                    <div className="product-dashboard-header">
                        <div>
                            <h2>Painel de Produtos</h2>
                            <p> Controle de Estoque e Produtos</p>
                        </div>
                    </div>

                    <table className="vendas-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produto</th>
                                <th>Preço de Venda</th>
                                <th>Preço de Compra</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            {product.id}
                                        </td>
                                        <td className="product-name">
                                            {product.product_name}
                                        </td>
                                        <td>
                                            {Number(
                                                product.selling_price
                                            ).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </td>
                                        <td>
                                            {Number(
                                                product.price_at_purchase
                                            ).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </td>
                                        <td>
                                            <span
                                                className={
                                                    product.stock_quantity <= 5
                                                        ? "stock-badge low-stock"
                                                        : "stock-badge"
                                                }
                                            >
                                                {product.stock_quantity}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        Nenhum produto encontrado.
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
    );
}

export default Product