import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import '../styles/Footer.css'; // Import your footer styles here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="sitemap">
        <h3>Policy:</h3>
        <ul>
          <li><Link to="/terms">Terms & Service</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="links">
        <h3>Popular links:</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/learn-about-topsoil">Learn About Topsoil</Link></li>
          <li><Link to="/topsoil-calculator">Topsoil Calculator</Link></li>
          <li><Link to="/order-now">Order Now</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;