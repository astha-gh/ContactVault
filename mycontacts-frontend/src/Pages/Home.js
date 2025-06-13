import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to ContactVault</h1>
            <p className="home-subtitle">
                Manage your contacts securely. Create, edit, and delete contacts with ease.
            </p>
            <div className="home-buttons">
                <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="btn btn-secondary">Signup</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

