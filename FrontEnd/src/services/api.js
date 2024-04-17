// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5173/api'; // Change this to your backend's URL

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // This should contain the token
  } catch (error) {
    throw error.response.data; // An object with an error message
  }
}

