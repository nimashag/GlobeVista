import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites } from '../services/favoritesService';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  
  const loadFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error('Failed to load favorites', err);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites(); // Load favorites only when user is logged in
    } else {
      setFavorites([]); // Clear favorites if user logs out
    }
  }, [user]); // 👈 run whenever the user changes

  const clearFavorites = () => {
    setFavorites([]);
  };


  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, loadFavorites, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
