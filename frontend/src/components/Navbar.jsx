import React, { useState, useEffect, useRef, useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { clearFavorites } = useFavorites();
  const profileRef = useRef();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    clearFavorites(); // ✅ clear on logout
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* App Name */}
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          <span className="md:inline">🌍 GlobeVista</span>
        </div>

        {/* Right section: Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
        <Link to="/" className="hover:text-blue-500">Home</Link>
          {user && (
            <Link to="/favorites" className="hover:text-blue-500">Favorites</Link>
          )}
          <ThemeToggle />
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-2 px-3 py-2 rounded transition hover:bg-gray-100 dark:hover:bg-gray-700"
              data-testid="profile-button" 
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 shadow-lg rounded-md text-sm py-2 z-10">
                {!user ? (
                  <>
                    <a href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Login</a>
                    <a href="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Register</a>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="flex items-center md:hidden gap-4">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300"
            data-testid="hamburger-button"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-6 px-6 text-center text-gray-700 dark:text-gray-200 space-y-4">
          <Link to="/" className="block hover:text-blue-500">Home</Link>
          {user && (
            <Link to="/favorites" className="block hover:text-blue-500">Favorites</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="block hover:text-blue-500">Login</Link>
              <Link to="/register" className="block hover:text-blue-500">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block w-full hover:text-blue-500">Logout</button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
