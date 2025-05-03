import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter>
    <AuthProvider>           
      <FavoritesProvider>         
        <App />
      </FavoritesProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>

);
