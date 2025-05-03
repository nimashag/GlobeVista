import api from './api';

export const registerUser = (userData) => {
    return api
      .post('/auth/register', userData)
      .then((response) => response)  // Make sure the response is correctly returned
      .catch((error) => {
        console.error("Registration error:", error);  // Log error details
        throw error; // Rethrow error to handle it in the component
      });
  };

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
