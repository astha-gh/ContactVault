import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Logging in...');

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); 

            if (response.ok) {
                localStorage.setItem('token', data.accessToken);
                setMessage("Login successful!");
                setTimeout(() => navigate('/dashboard'), 1000);
            } else {
                setMessage(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Something went wrong.");
        }
    };

    return (
        <div className="auth-container">
            <div className="form-card">
                <h2 className="form-title">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="btn-submit">Login</button>
                </form>
                {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
                <p className="auth-link">Don't have an account? <Link to="/signup" className="link">Sign up here</Link></p>
            </div>
        </div>
    );
};

export default Login;
