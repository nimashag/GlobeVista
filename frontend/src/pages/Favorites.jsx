import React, { useEffect, useState } from 'react';
import { getFavorites } from '../services/favoritesService';
import { fetchAllCountries } from '../services/countriesApi';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '../context/FavoritesContext';

function Favorites() {
  const { favorites } = useFavorites();
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAllCountries();
        setAllCountries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const favoriteCountries = allCountries.filter(c => favorites.includes(c.cca3));

  return (
    <div className="px-4 sm:px-8 md:px-16 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
        Your Favorite Countries
      </h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : favoriteCountries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">You have no favorite countries yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
