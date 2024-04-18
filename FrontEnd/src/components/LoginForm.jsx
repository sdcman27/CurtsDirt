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
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', data.token);
      console.log(data)

      // Redirect user to the home page
      navigate('/');

      // Optionally, set the auth token for any future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Whoops, An error occurred during login.');
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
