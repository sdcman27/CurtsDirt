// LearnAboutTopsoil.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LearnAboutTopsoil = () => {
  return (
    <div>
      <h1>Learn About Topsoil</h1>
      <p>When planning a gardening or landscaping project, choosing the right type of topsoil is crucial for success. Each type of soil offers unique benefits and is suited to different uses. At CurtsDirt, we offer a variety of topsoil types to ensure you have the best possible foundation for your planting and construction projects. Here’s a breakdown of our topsoil offerings and their advantages:</p>
      <div className="topsoil-types">
        <h2>Subsoil</h2>
        <p>Perfect for foundational projects, providing stability and support.</p>
        <Link to="/order-now" className="button">Submit Inquiry</Link>
        <Link to="/topsoil-calculator" className="button">Topsoil Calculator</Link>

        <h2>Fill Topsoil</h2>
        <p>Cost-effective for large areas, ideal for leveling and filling.</p>
        <Link to="/order-now" className="button">Submit Inquiry</Link>
        <Link to="/topsoil-calculator" className="button">Topsoil Calculator</Link>

        <h2>Shaken Topsoil</h2>
        <p>Screened for uniformity, great for gardens and lawns.</p>
        <Link to="/order-now" className="button">Submit Inquiry</Link>
        <Link to="/topsoil-calculator" className="button">Topsoil Calculator</Link>

        <h2>Peat Moss Mixed Topsoil</h2>
        <p>Enhances moisture retention, perfect for moisture-intensive gardening.</p>
        <Link to="/order-now" className="button">Submit Inquiry</Link>
        <Link to="/topsoil-calculator" className="button">Topsoil Calculator</Link>

        <h2>Medallion Shale</h2>
        <p>Perfect for foundational projects, providing stability and support, also great for walkways, the medallion shale does not contain dirt making it great for walkways and borders.</p>
        <Link to="/order-now" className="button">Submit Inquiry</Link>
        <Link to="/topsoil-calculator" className="button">Topsoil Calculator</Link>
      </div>
    </div>
  );
};

export default LearnAboutTopsoil;
