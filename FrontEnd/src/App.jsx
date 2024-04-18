import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import LearnAboutTopsoil from './pages/LearnAboutTopsoil';
import OrderNow from './pages/OrderNow';
import './App.css';
import SidePanel from './components/SidePanel';



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
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <SidePanel isOpen={isSidePanelOpen} setIsOpen={setIsSidePanelOpen} />  {/* This will render the side panel */}
          <div className={`main-content ${isSidePanelOpen ? 'content-shift' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/learn-about-topsoil" element={<LearnAboutTopsoil />} />
              <Route path="/order-now" element={<OrderNow />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;


