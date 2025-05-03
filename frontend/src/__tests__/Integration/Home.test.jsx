// __tests__/Home.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import * as countriesApi from '../../services/countriesApi';
import { AuthProvider } from '../../context/AuthContext';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { BrowserRouter } from 'react-router-dom';

// Mock API response
const mockCountries = [
  {
    cca3: 'USA',
    name: { common: 'United States' },
    population: 331002651,
    region: 'Americas',
    capital: ['Washington, D.C.'],
    flags: { png: 'https://flagcdn.com/us.png' },
    languages: { eng: 'English' },
  },
  {
    cca3: 'FRA',
    name: { common: 'France' },
    population: 67000000,
    region: 'Europe',
    capital: ['Paris'],
    flags: { png: 'https://flagcdn.com/fr.png' },
    languages: { fra: 'French' },
  },
];

const mockCountrySearch = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.'],
      flags: { png: 'https://flagcdn.com/us.png' },
      languages: { eng: 'English' },
    },
  ];

  const mockCountriesByRegion = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.'],
      flags: { png: 'https://flagcdn.com/us.png' },
      languages: { eng: 'English' },
    },
  ];

jest.mock('../../services/countriesApi');

describe('Home Page', () => {
  it('displays country cards after fetching', async () => {
    countriesApi.fetchAllCountries.mockResolvedValueOnce({ data: mockCountries });

    render(
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <Home />
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Loading text should appear initially
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();

    // Wait for countries to be loaded
    await waitFor(() => {
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
      expect(screen.getByText(/France/i)).toBeInTheDocument();
    });

    // Check for flag images
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('displays search results when searching for a country', async () => {
    countriesApi.fetchCountryByName.mockResolvedValueOnce({ data: mockCountrySearch });

    render(
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <Home />
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Input search term
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: 'United States' } });

    // Wait for the search results to load
    await waitFor(() => {
      expect(countriesApi.fetchCountryByName).toHaveBeenCalledWith('United States');
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
    });
  });

  it('filters countries by region when a region is selected', async () => {
    countriesApi.fetchCountriesByRegion.mockResolvedValueOnce({ data: mockCountriesByRegion });

    render(
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <Home />
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate selecting a region from the dropdown
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'Americas' } });

    // Wait for the countries to be filtered by region
    await waitFor(() => {
      expect(countriesApi.fetchCountriesByRegion).toHaveBeenCalledWith('Americas');
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
      expect(screen.queryByText(/France/i)).not.toBeInTheDocument(); // Ensure France is not shown
    });
  });
});
