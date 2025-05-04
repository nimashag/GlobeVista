import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-4 text-center space-y-4 text-sm text-gray-600 dark:text-gray-400 transition-colors">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">GlobeVista</h2>
      <p className="max-w-md mx-auto text-sm">
        Your trusted platform for global insights and exploration.
      </p>

      <nav className="space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <span>|</span>
        <a href="/countries" className="hover:underline">Explore</a>
        <span>|</span>
        <a href="/" className="hover:underline">About</a>
        <span>|</span>
        <a href="/" className="hover:underline">Contact</a>
      </nav>

      <div className="flex justify-center space-x-4 pt-2">
        <a href="#" aria-label="Facebook" className="hover:text-blue-500"><FaFacebookF /></a>
        <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter /></a>
        <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"><FaLinkedinIn /></a>
        <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
      </div>

      <p className="text-xs text-gray-500 pt-4">
        &copy; {new Date().getFullYear()} GlobeVista. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
