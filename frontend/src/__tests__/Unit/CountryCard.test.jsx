import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../../components/CountryCard';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import * as favoritesService from '../../services/favoritesService';
import Swal from 'sweetalert2';

jest.mock('../../services/favoritesService', () => ({
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  population: 331000000,
  region: 'Americas',
  capital: ['Washington, D.C.'],
  flags: { png: 'https://flagcdn.com/us.png' },
  languages: { eng: 'English' },
};

const renderWithProviders = (ui, { user = null, favorites = [], loadFavorites = jest.fn() } = {}) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <FavoritesContext.Provider value={{ favorites, loadFavorites }}>
          {ui}
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('CountryCard Component', () => {
  it('renders country data correctly', () => {
    renderWithProviders(<CountryCard country={mockCountry} />);
    expect(screen.getByText(/United States/i)).toBeInTheDocument();
    expect(screen.getByText(/Americas/)).toBeInTheDocument();
    expect(screen.getByText(/331,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/Washington, D.C./)).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
  });

  it('shows login alert when not logged in and heart clicked', () => {
    renderWithProviders(<CountryCard country={mockCountry} />, { user: null });
    fireEvent.click(screen.getByRole('button'));
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Login required',
    }));
  });

  it('adds to favorites when user clicks heart and not already favorite', async () => {
    const loadFavorites = jest.fn();
    renderWithProviders(<CountryCard country={mockCountry} />, {
      user: { id: 1 },
      favorites: [],
      loadFavorites,
    });

    fireEvent.click(screen.getByRole('button'));
    expect(favoritesService.addFavorite).toHaveBeenCalledWith('USA');
  });

  it('removes from favorites when user clicks heart and already favorite', async () => {
    const loadFavorites = jest.fn();
    renderWithProviders(<CountryCard country={mockCountry} />, {
      user: { id: 1 },
      favorites: ['USA'],
      loadFavorites,
    });

    fireEvent.click(screen.getByRole('button'));
    expect(favoritesService.removeFavorite).toHaveBeenCalledWith('USA');
  });
});
