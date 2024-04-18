import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useAuth } from '../services/AuthContext'; // Import useAuth

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const navigate = useNavigate(); // Hook to navigate
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
        const data = await loginUser(username, password);
        login(data.token); // Use the login function from context
        navigate('/');
    } catch (error) {
        setErrorMessage(error?.response?.data?.message || 'Whoops, An error occurred during login.');
    }
};

return (
  <div>
      {errorMessage && <p>{errorMessage}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Log In</button>
  </div>
);
}

export default LoginForm;
