import "./Sale.css"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sale() {
  const [saleItems, setSaleItems] = useState([])
  const [searchedProducts, setSearchedProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  const removeItem = (productId) => {
    setSaleItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  const finishSale = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/sales`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify({sale_items: saleItems, employee_id: localStorage.getItem("employeeId")}
        )})

        const data = await response.json()
        console.log(data)
        navigate("/")
    } catch (error) {
        console.log("Error while creating sale. error: ", error)
    }
  }

  const searchProducts = async () => {
      if (!searchQuery.trim()) {
          alert("Digite o nome do produto para pesquisar.");
          return;
      }
      
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/products/search/${encodeURIComponent(searchQuery)}?page=${page}&size=${pageSize}`, {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        })

        if (response.status === 401) {
              localStorage.removeItem("token");
              navigate("/login");
              return;
            }

        const data = await response.json()
        setSearchedProducts(data.items)
    } catch (error) {
      console.log("Error while searching for a product. error: ", error)
    }
  }

  return (
    <div className="add-sale-card">
        <nav className="nav-bar-sales">
        <div className="logo">
            <h1>Sistema de Vendas</h1>
        </div>
        <ul className="nav-links-sales">
            <li><a href="/products">Lista de Produtos</a> </li>
            <li><a href="/">Painel de Vendas</a></li>
        </ul>
        <div className="nav-actions-sales">
            <button className="logout-btn" onClick={handleLogout}> Sair </button>
        </div>
        </nav>
        <div className="sales-panels">
            <div className="sales-dashboard">
                <div className="sales-dashboard-content">
                    <h2>Lista de Produtos</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Pesquisar produto..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button onClick={searchProducts}>
                            Pesquisar
                        </button>
                    </div>
                    <table className="add-sales-table">
                        <thead>
                            <tr>
                                <th>ID_Produto</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedProducts.length > 0
                                ? searchedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.product_name}</td>
                                        <td>R$ {product.selling_price}</td>
                                        <td>{product.stock_quantity}</td>
                                        <td>
                                            <button onClick={() => {
                                                if (product.stock_quantity > 0) {
                                                    setSearchedProducts((products) =>
                                                    products.map((p) =>
                                                        p.id === product.id
                                                            ? { ...p, stock_quantity: p.stock_quantity - 1 }
                                                            : p
                                                    )
                                                );

                                                    setSaleItems((saleItems) => {
                                                        const existingItem = saleItems.find(
                                                            (item) => item.product_id === product.id
                                                        )

                                                        if (existingItem) {
                                                            return saleItems.map((item) =>
                                                                item.product_id == product.id
                                                                    ? {...item, quantity: item.quantity + 1}
                                                                    : item 
                                                            )       
                                                        }
                                                    
                                                    const saleItem = {
                                                        product_id: product.id,
                                                        quantity: 1,
                                                        product_name: product.product_name,
                                                        price: product.selling_price
                                                    };

                                                    return [...saleItems, saleItem]
                                                    })
                                                } else {
                                                    alert("Produto sem estoque!");
                                                }
                                            }}>
                                                Adicionar à Venda
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        Digite o nome do produto e clique em "Pesquisar" para ver os resultados.
                                    </td>
                                </tr>
                            }
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
                        {totalPages > 1 ? (
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
                    </div>
                </div>
            </div>
            <div className="sales-right-panel">
                <div className="current-sale-items-dashboard">
                    <div className="current-sale-items-content">
                        <h1>Itens da Venda</h1>
                        <table className="sale-items-table">
                            <thead>
                                <tr>
                                    <th>ID_Produto</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {saleItems.length > 0 ? 
                                    saleItems.map((item) => (
                                        <tr key={item.product_id}>
                                            <td>{item.product_id}</td>
                                            <td>{item.product_name}</td>
                                            <td>R$ {item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                <button className="delete-btn" onClick={() => removeItem(item.id)}>
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                                Nenhum item adicionado à venda.
                                            </td>
                                        </tr>
                                )}
                                </tbody>
                        </table>
                    </div>
                </div>
                <div className="sale-summary">
                    <h2>Resumo da Venda</h2>
                    <p>Total da Venda: R$ {saleItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                    <button className="finish-sale-btn" onClick={() => finishSale()}>
                        Finalizar Venda
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sale