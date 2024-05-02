import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import LearnAboutTopsoil from './pages/LearnAboutTopsoil';
import OrderNow from './pages/OrderNow';
import './App.css';
import SidePanel from './components/SidePanel';
import TopsoilCalculator from './pages/TopsoilCalculator';
import Footer from './components/Footer'; // Import the Footer component
import { LoadScript } from '@react-google-maps/api';


const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth(); // Use the useAuth hook
  return (
    <header className="App-header">
      <h1>Welcome to CurtsDirt</h1>
      <nav>
        <Link to="/" className="HomeButton">Home</Link>
        {isAuthenticated ? (
          <button onClick={logout} className="LoginButton">Logout</button>
        ) : (
          <Link to="/login" className="LoginButton">Login</Link>
        )}
      </nav>
    </header>
  );
};

const App = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  return (
    <Router>
      <AuthProvider>
      <LoadScript
          googleMapsApiKey={apiKey} 
          libraries={['places']}
        >
        <div className="App">
          <SidePanel isOpen={isSidePanelOpen} setIsOpen={setIsSidePanelOpen} />  
          <div className={`main-content ${isSidePanelOpen ? 'content-shift' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/learn-about-topsoil" element={<LearnAboutTopsoil />} />
              <Route path="/topsoil-calculator" element={<TopsoilCalculator />} />
              <Route path="/order-now" element={<OrderNow />} />
            </Routes>
          </div>
        </div>
        </LoadScript>
        <Footer />
      </AuthProvider>
    </Router>
    
  );
};

export default App;


