import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetails from '../../pages/CountryDetails';
import * as countriesApi from '../../services/countriesApi';
import { AuthProvider } from '../../context/AuthContext';
import { FavoritesProvider } from '../../context/FavoritesContext';

// Minimal mock country with required fields
const mockCountry = {
  name: {
    common: 'Japan',
    official: 'Japan',
    nativeName: {
      jpn: { common: '日本' },
    },
  },
  flags: { svg: 'https://flagcdn.com/jp.svg' },
  population: 125800000,
  region: 'Asia',
  subregion: 'East Asia',
  capital: ['Tokyo'],
  area: 377975,
  languages: { jpn: 'Japanese' },
  timezones: ['UTC+09:00'],
  currencies: { JPY: { name: 'Yen', symbol: '¥' } },
  maps: {},
};

// Mock the API function
jest.mock('../../services/countriesApi');

test('displays loading message, then renders country name after fetch', async () => {
  countriesApi.fetchCountryByCode.mockResolvedValueOnce({ data: [mockCountry] });

  render(
    <MemoryRouter initialEntries={['/country/JP']}>
      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </MemoryRouter>
  );

  // Loading state
  expect(screen.getByText(/loading country details/i)).toBeInTheDocument();

  // Wait for country name to appear
  const countryHeading = await screen.findByRole('heading', { name: 'Japan' });
  expect(countryHeading).toBeInTheDocument();

  // Optional: check for capital city and currency
//   expect(screen.getByText(/Capital: Tokyo/i)).toBeInTheDocument();
//   expect(screen.getByText(/Currencies: Yen \(¥\)/i)).toBeInTheDocument();
});

test('renders Wikipedia link with correct href', async () => {
    countriesApi.fetchCountryByCode.mockResolvedValueOnce({ data: [mockCountry] });
  
    render(
      <MemoryRouter initialEntries={['/country/JP']}>
        <AuthProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/country/:code" element={<CountryDetails />} />
            </Routes>
          </FavoritesProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  
    // Wait for the country data to load
    await screen.findByRole('heading', { name: 'Japan' });
  
    // Check for Wikipedia link
    const wikiLink = screen.getByRole('link', {
      name: /learn history on wikipedia/i,
    });
  
    expect(wikiLink).toBeInTheDocument();
    expect(wikiLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Japan');
    expect(wikiLink).toHaveAttribute('target', '_blank');
  });
  