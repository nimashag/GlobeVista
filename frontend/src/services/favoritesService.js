import api from './api';

export const getFavorites = () => api.get('/favorites');

export const addFavorite = (countryCode) => api.post('/favorites', { country: countryCode });

export const removeFavorite = (countryCode) => api.delete(`/favorites/${countryCode}`);
