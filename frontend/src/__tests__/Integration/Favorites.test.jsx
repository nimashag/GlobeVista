import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Favorites from '../../pages/Favorites';
import { FavoritesContext } from '../../context/FavoritesContext';
import * as countriesApi from '../../services/countriesApi';

// Mock CountryCard to avoid rendering full card
jest.mock('../../components/CountryCard', () => ({ country }) => (
  <div>{country.name.common}</div>
));

// Mock fetchAllCountries
jest.spyOn(countriesApi, 'fetchAllCountries').mockResolvedValue({
  data: [
    { cca3: 'JPN', name: { common: 'Japan' } },
    { cca3: 'FRA', name: { common: 'France' } },
    { cca3: 'ESP', name: { common: 'Spain' } },
  ],
});

describe('Favorites Page', () => {
  it('renders favorite countries', async () => {
    const mockFavorites = ['JPN', 'ESP'];

    render(
      <FavoritesContext.Provider value={{ favorites: mockFavorites }}>
        <Favorites />
      </FavoritesContext.Provider>
    );

    // Loading initially
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.getByText('Spain')).toBeInTheDocument();
    });

    // Should not render France since it's not a favorite
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  it('shows a message when there are no favorite countries', async () => {
    render(
      <FavoritesContext.Provider value={{ favorites: [] }}>
        <Favorites />
      </FavoritesContext.Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/You have no favorite countries yet/i)).toBeInTheDocument();
    });

    // Ensure no countries are rendered
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });
});
