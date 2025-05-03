import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  return (
    <div className="flex items-center w-full md:w-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-800 transition-colors">
      <Search className="w-4 h-4 text-gray-400 dark:text-gray-300" />
      <input
        type="text"
        placeholder="Search for a country..."
        className="ml-2 w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
