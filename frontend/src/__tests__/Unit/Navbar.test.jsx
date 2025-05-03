import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the context providers for testing
const mockAuthContext = {
  user: { username: 'TestUser' },
  logout: jest.fn(),
};

const mockFavoritesContext = {
  clearFavorites: jest.fn(),
};

describe('Navbar', () => {
  it('renders navbar and displays Home link', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <FavoritesContext.Provider value={mockFavoritesContext}>
          <Router>
            <Navbar />
          </Router>
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    );
    
    // Check if Home link is in the document
    expect(screen.getByText('Home')).toBeInTheDocument();
  });


  it('displays the profile menu when the profile button is clicked', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <FavoritesContext.Provider value={mockFavoritesContext}>
          <Router>
            <Navbar />
          </Router>
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    );

    // Click to open profile menu
    fireEvent.click(screen.getByText('Profile'));
    expect(screen.getByText('Logout')).toBeInTheDocument(); // Logout should be visible for logged-in user
  });

  it('calls logout and clears favorites when logout button is clicked', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <FavoritesContext.Provider value={mockFavoritesContext}>
          <Router>
            <Navbar />
          </Router>
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    );

    // Click to open profile menu and then logout
    fireEvent.click(screen.getByText('Profile'));
    fireEvent.click(screen.getByText('Logout'));

    expect(mockAuthContext.logout).toHaveBeenCalled(); // Verify logout is called
    expect(mockFavoritesContext.clearFavorites).toHaveBeenCalled(); // Verify clearFavorites is called
  });

  it('displays profile menu when profile button is clicked', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <FavoritesContext.Provider value={mockFavoritesContext}>
          <Router>
            <Navbar />
          </Router>
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    );

    // Click to open profile menu
    fireEvent.click(screen.getByTestId('profile-button'));
    expect(screen.getByText('Logout')).toBeInTheDocument(); // Logout should be visible for logged-in user
  });
});
