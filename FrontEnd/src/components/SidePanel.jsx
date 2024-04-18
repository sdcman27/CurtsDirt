import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SidePanel.css';
import { useAuth } from '../services/AuthContext';

const SidePanel = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false); // Optionally close the side panel on logout
    };

    return (
        <div className={`side-panel ${isOpen ? 'open' : 'closed'}`}>
            <div className="toggle-button-container">
                <button className="toggle-button" onClick={togglePanel}>
                    {isOpen ? '✖' : '☰'}  
                </button>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/learn-about-topsoil">Learn about Topsoil</Link>
                <Link to="/order-now">Order Now</Link>
            </div>
            <div className="side-panel-footer">
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                )}
            </div>
        </div>
    );
};

export default SidePanel;