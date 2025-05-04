import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; 
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Import navigate hook to redirect user
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials); // Send credentials to loginUser function
      if (response.data.token) {
        // Store token in localStorage and redirect user to home
        login(response.data.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });

        
        navigate('/'); // Redirect to home page
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid credentials. Please try again.',
      });

      setError('Invalid credentials. Please try again.'); // Show error if login fails
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      
      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[1200px] h-[1200px] bg-gradient-to-br from-blue-300 to-purple-400 dark:from-blue-900 dark:to-indigo-800 rounded-full animate-spin-slow blur-3xl opacity-20 -top-1/2 -left-1/2" />
        <div className="absolute w-[1000px] h-[1000px] bg-gradient-to-tr from-green-300 to-blue-500 dark:from-green-800 dark:to-blue-700 rounded-full animate-pulse blur-2xl opacity-10 top-1/3 left-1/3" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/50 p-10 rounded-3xl shadow-2xl transform transition-transform hover:scale-[1.02] w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back 🌍
        </h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
