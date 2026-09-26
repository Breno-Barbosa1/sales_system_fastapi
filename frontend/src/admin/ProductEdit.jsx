import "./ProductEdit.css"

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProductEdit() {
    const [product, setProduct] = useState();
    const productId = window.location.pathname.split("/").pop();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(product)
            });

            const data = await response.json();
            alert(`Produto atualizado com sucesso! ID: ${data.id}`)
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        fetchProduct()
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="product-edit-card">
            <nav className="nav-bar-product-edit">
                <div className="logo">
                    <h1>Sistema de Vendas</h1>
                </div>
                <ul className="nav-links-product-edit">
                    <li>
                        <a href="/products">Lista de Produtos</a>
                    </li>

                    <li>
                        <a href="/">Painel de Vendas</a>
                    </li>
                </ul>
                <div className="nav-actions-product-edit">
                    <button className="logout-btn">
                        Sair
                    </button>
                </div>
            </nav>
            <div className="product-edit-dashboard">
                <div className="product-edit-content">
                    <div className="product-edit-header">
                        <h2>Editar Produto</h2>
                        <p>Atualize as informações do produto</p>
                    </div>
                    <div className="product-edit-form-container">
                        <form className="product-edit-form" onSubmit={handleUpdateProduct}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nome do Produto</label>
                                    <input type="text" value={product?.product_name || ""} onChange={(e) => setProduct({...product, product_name: e.target.value})} />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Preço de Venda</label>
                                        <input
                                            type="text"
                                            value={
                                                product?.selling_price != null
                                                    ? formatCurrency(product.selling_price)
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    .replace(/\D/g, "");

                                                setProduct({
                                                    ...product,
                                                    selling_price: Number(value) / 100
                                                });
                                            }}
                                        />
                                </div>

                                <div className="form-group">
                                    <label>Preço de Compra</label>
                                    <input
                                        type="text"
                                        value={
                                            product?.price_at_purchase != null
                                                ? formatCurrency(product.price_at_purchase)
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, "");

                                            setProduct({
                                                ...product,
                                                price_at_purchase: Number(value) / 100
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Quantidade em Estoque</label>
                                    <input type="number" step="1" value={product?.stock_quantity ?? ""} onChange={(e) => setProduct({...product, stock_quantity: e.target.value})}/>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => navigate("/admin/products")}
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

export default ProductEdit;
