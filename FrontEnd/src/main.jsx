import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Reset your styles or use global styles
import App from './App.jsx'; // Import App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

