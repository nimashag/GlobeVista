// src/__tests__/ThemeToggle.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle';

// Mocking localStorage for testing purposes
beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn(() => 'light'); // Initially 'light' theme
});

describe('ThemeToggle Component', () => {
  test('renders the theme toggle button with moon icon initially', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    const moonIcon = screen.getByTestId('moon-icon'); // Adjust the data-testid accordingly
    expect(moonIcon).toBeInTheDocument();
  });

  test('toggles to dark mode when clicked', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button); // Click to toggle theme

    // Check if the dark theme is applied to document
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Check if localStorage is updated correctly
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('toggles back to light mode when clicked again', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button); // Toggle to dark mode
    fireEvent.click(button); // Toggle back to light mode

    // Check if the light theme is applied to document
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Check if localStorage is updated correctly
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});
