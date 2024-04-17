import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import './App.css';

const Navigation = () => {
  // Hook is now being used within the context of <Router>
  const location = useLocation();

  return (
    <>
      <header className="App-header">
        <h1>Welcome to CurtsDirt</h1>
        {location.pathname !== '/login' && (
          <nav>
            <Link to="/login" className="LoginButton">Login</Link> {/* Show only if not on login page */}
          </nav>
        )}
        {location.pathname === '/login' && (
          <nav>
            <Link to="/" className="HomeButton">Home</Link> {/* Show on login page */}
          </nav>
        )}
      </header>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Navigation /><Home /></>} />
          <Route path="/login" element={<><Navigation /><LoginForm /></>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;