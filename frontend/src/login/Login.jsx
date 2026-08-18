import './Login.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()
            const token = data.access_token
            localStorage.setItem("token", token)
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="login-card">
            <div className="left-panel">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">
                        Sign In
                    </button>
                </form>
            </div>
            <div className="right-panel"><h1>Bem-vindo de volta</h1></div>
        </div>
    );
}

export default Login;