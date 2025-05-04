import React, { useEffect, useState } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion,
} from "../services/countriesApi";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import LanguageFilterDropdown from "../components/LanguageFilterDropdown";

const ITEMS_PER_PAGE = 8;

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);
  const paginatedCountries = countries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const loadAllCountries = async () => {
    setLoading(true);
    try {
      const response = await fetchAllCountries();
      setCountries(response.data);
      setCurrentPage(1); // Reset to page 1
    } catch (error) {
      console.log("Failed to load countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) return loadAllCountries();
    try {
      const response = await fetchCountryByName(query);
      setCountries(response.data);
      setCurrentPage(1); // Reset page on new search
    } catch {
      setCountries([]);
      setCurrentPage(1);
    }
  };

  const handleRegionSelect = async (region) => {
    if (!region) return loadAllCountries();
    try {
      const response = await fetchCountriesByRegion(region);
      setCountries(response.data);
      setCurrentPage(1); // Reset page on filter
    } catch (error) {
      console.error("Error filtering by region:", error);
    }
  };

  const handleLanguageSelect = async (language) => {
    if (!language) return loadAllCountries();
    try {
      const response = await fetchAllCountries();
      const filtered = response.data.filter((country) => {
        const langs = Object.values(country.languages || {});
        return langs.includes(language);
      });
      setCountries(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering by language:", error);
    }
  };

  useEffect(() => {
    loadAllCountries();
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-16 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 mb-8">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row gap-4">
          <FilterDropdown onSelect={handleRegionSelect} />
          <LanguageFilterDropdown onSelect={handleLanguageSelect} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          Loading countries...
        </p>
      ) : countries.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          No countries found.
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 text-sm text-gray-700 dark:text-gray-300">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              &lt;
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
