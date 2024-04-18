import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './services/AuthContext'; // Import useAuth
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import './App.css';
import { AuthProvider } from './services/AuthContext'; // Import AuthProvider

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
  return (
      <Router>
          <AuthProvider> {/* Wrap components with AuthProvider */}
              <div className="App">
                  <Routes>
                      <Route path="/" element={<><Navigation /><Home /></>} />
                      <Route path="/login" element={<><Navigation /><LoginForm /></>} />
                  </Routes>
              </div>
          </AuthProvider>
      </Router>
  );
};

export default App;