import React from 'react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-16 border-t border-gray-200 dark:border-gray-700 text-center py-6 text-sm text-gray-500 dark:text-gray-400 transition-colors">
      <p>&copy; {new Date().getFullYear()} GlobeVista. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
