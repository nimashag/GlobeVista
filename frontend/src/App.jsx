import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hero from './pages/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./pages/Register";
import Login from './pages/Login';
import CountryDetails from './pages/CountryDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/countries" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
