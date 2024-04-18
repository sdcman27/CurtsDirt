import React from 'react';
import { Link } from 'react-router-dom';
import './SidePanel.css';

const SidePanel = () => {
    const [isOpen, setIsOpen] = useState(false);  // State to manage if the panel is open or closed

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`side-panel ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={togglePanel}>
                {isOpen ? '✖' : '☰'}  // Use icons or similar for better UX
            </button>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/learn-about-topsoil">Learn about Topsoil</Link>
                <Link to="/order-now">Order Now</Link>
            </div>
        </div>
    );
};

export default SidePanel;