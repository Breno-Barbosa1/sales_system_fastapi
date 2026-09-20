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

  const searchProducts = async () => {
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
              <button className="logout-btn-sales" onClick={handleLogout}> Sair </button>
          </div>
      </nav>
      <div className="sales-dashboard">
        <div className="sales-dashboard-content">
            <h2>Painel de Vendas</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar produto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={searchProducts}>Pesquisar</button>
            </div>
            <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchedProducts.length > 0
                            ? searchedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.product_name}</td>
                                    <td>R$ {product.selling_price}</td>
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
            <div className="current-sale-items">
            <h1>Itens da Venda</h1>
            {saleItems.length > 0 ? (
                <table className="sale-items-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>R$ {item.selling_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum item adicionado à venda.</p>
            )}
        </div>
        </div>
    </div>
  )
}

export default Sale