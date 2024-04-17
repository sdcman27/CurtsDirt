import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const navigate = useNavigate(); // Hook to navigate

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      console.log(data); // Do something with the token, like storing it
      navigate('/'); // Navigate to the home page on successful login
    } catch (error) {
      // Use the error message from the server if it exists, otherwise a generic message
      setErrorMessage(error?.response?.data?.message || 'An error occurred during login.');
    }
  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginForm;
