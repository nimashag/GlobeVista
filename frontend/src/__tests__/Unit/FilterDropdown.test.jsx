import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterDropdown from '../../components/FilterDropdown';

describe('FilterDropdown component', () => {
  test('renders all region options', () => {
    render(<FilterDropdown onSelect={() => {}} />);

    // Check for placeholder option
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();

    // Check all regions
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    regions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  test('calls onSelect when an option is selected', () => {
    const mockSelect = jest.fn();
    render(<FilterDropdown onSelect={mockSelect} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Asia' } });

    expect(mockSelect).toHaveBeenCalledWith('Asia');
  });
});
