import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar component', () => {
  test('renders input with placeholder', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/search for a country/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch with the correct input value', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(inputElement, { target: { value: 'India' } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('India');
  });
});
