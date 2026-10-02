import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './login/Login.jsx'
import Home from './home/Home.jsx'
import Product from './product/Product.jsx'
import Sale from './sale/Sale.jsx'
import AdminProduct from './admin/Product.jsx'
import AdminProductEdit from './admin/ProductEdit.jsx'
import AdminPanel from './admin/AdminPanel.jsx'
import AdminSale from './admin/Sale.jsx'
import AdminEmployee from './admin/Employee.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/create-sale" element={<Sale />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
          <Route path="/admin/sales" element={<AdminSale />} />
          <Route path="/admin/employees" element={<AdminEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App