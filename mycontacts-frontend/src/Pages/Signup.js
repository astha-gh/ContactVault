import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
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

        if (!formData.username || !formData.email || !formData.password) {
            setMessage("All fields are required");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

           
            const data = await response.json();
            

            if (response.ok) {
                setMessage("Signup successful");
                setFormData({ username: '', email: '', password: '' });
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setMessage(data.message || "Signup failed.");
            }
        } catch (error) {
            
            setMessage("Something went wrong. Check console for details.");
        }
    };

    return (
        <div className="signup-container">
            <div className="form-card">
                <h2 className="form-title">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
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
                    <button type="submit" className="btn-submit">Register</button>
                </form>
                {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
                <p className="login-link">Already have an account? <Link to="/login" className="link">Login here</Link></p>
            </div>
        </div>
    );
};

export default Signup;
