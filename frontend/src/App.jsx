import './App.css'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './login/Login.jsx'
import Home from './home/Home.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App