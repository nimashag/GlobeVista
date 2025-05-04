// src/components/LanguageFilterDropdown.jsx
import React, { useEffect, useState } from "react";
import { fetchAllCountries } from "../services/countriesApi";

function LanguageFilterDropdown({ onSelect }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await fetchAllCountries();
        const countries = response.data;

        const langSet = new Set();
        countries.forEach((country) => {
          const langs = Object.values(country.languages || {});
          langs.forEach((lang) => langSet.add(lang));
        });

        setLanguages([...langSet].sort());
      } catch (error) {
        console.error("Failed to load languages:", error);
      }
    };

    loadLanguages();
  }, []);

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
    >
      <option value="">Filter by Language</option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}

export default LanguageFilterDropdown;
