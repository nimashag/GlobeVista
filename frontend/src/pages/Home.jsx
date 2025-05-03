import React from 'react';
import { useEffect, useState } from 'react';
import { fetchAllCountries, fetchCountryByName, fetchCountriesByRegion } from '../services/countriesApi';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';


function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllCountries = async () => {
    setLoading(true);
    try {
      const response = await fetchAllCountries();
      setCountries(response.data);
    } catch (error) {
      console.log('Failed to load countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) return loadAllCountries();
    try {
      const response = await fetchCountryByName(query);
      setCountries(response.data);
    } catch {
      setCountries([]);
    }
  };

  const handleRegionSelect = async (region) => {
    if (!region) return loadAllCountries();
    try {
      const response = await fetchCountriesByRegion(region);
      setCountries(response.data);
    } catch (error) {
      console.error('Error filtering by region:', error);
    }
  };

  useEffect(() => {
    loadAllCountries();
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-16 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 mb-8">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onSelect={handleRegionSelect} />
      </div>


      {loading ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">Loading countries...</p>
      ) : countries.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">No countries found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
