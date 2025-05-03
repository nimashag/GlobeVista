import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo'); // This is the typical role for a footer
    expect(footerElement).toBeInTheDocument();
  });

  it('displays the correct year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const footerText = screen.getByText(`© ${year} GlobeVista. All rights reserved.`);
    expect(footerText).toBeInTheDocument();
  });
});
