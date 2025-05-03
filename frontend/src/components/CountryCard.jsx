import React, { useEffect, useState, useContext } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesService';
import { AuthContext } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import Swal from 'sweetalert2';


function CountryCard({ country }) {
  const { user } = useContext(AuthContext); // access user from context
  const { favorites, loadFavorites } = useFavorites();
  const isFavorite = favorites.includes(country.cca3);

  const toggleFavorite = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login required',
        text: 'Please log in to add countries to your favorites.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(country.cca3);
        Swal.fire({
          icon: 'success',
          title: 'Removed from favorites',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await addFavorite(country.cca3);
        Swal.fire({
          icon: 'success',
          title: 'Added to favorites',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
      }

      await loadFavorites(); // Refresh global favorites
    } catch (err) {
      console.error('Error updating favorite', err);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Could not update favorite.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <Link to={`/country/${country.cca3}`}>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden relative font-sans flex flex-col h-[420px]">
      {/* Flag */}
      <div className="w-full h-48 overflow-hidden flex items-center justify-center">
        <img
          src={country.flags?.png}
          alt={country.name.common}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Favorite Icon */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          {isFavorite ? (
  <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
) : (
  <Heart className="h-5 w-5 text-pink-500" />
)}
        </button>

      {/* Country Info */}
      <div className="p-4 text-sm space-y-2 text-gray-800 dark:text-gray-100 flex-1 overflow-auto">
        <h3 className="text-xl font-bold">{country.name.common}</h3>
        <p><span className="font-medium text-gray-500 dark:text-gray-400">Population:</span> {country.population.toLocaleString()}</p>
        <p><span className="font-medium text-gray-500 dark:text-gray-400">Region:</span> {country.region}</p>
        <p><span className="font-medium text-gray-500 dark:text-gray-400">Capital:</span> {country.capital?.[0]}</p>
        <p>
          <span className="font-medium text-gray-500 dark:text-gray-400">Languages:</span>{" "}
          {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
        </p>
      </div>
    </div>
    </Link>
  );
}

export default CountryCard;
