import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './login/Login.jsx'
import Home from './home/Home.jsx'
import Product from './product/Product.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App