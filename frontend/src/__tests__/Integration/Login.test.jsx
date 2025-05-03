// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';
import Swal from 'sweetalert2';

// Mock Swal
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Page', () => {
  it('logs in successfully and navigates to home', async () => {
    const loginMock = jest.fn();
    const mockToken = 'mock-jwt-token';

    // Mock the loginUser function
    jest.spyOn(authService, 'loginUser').mockResolvedValue({
      data: { token: mockToken },
    });

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: loginMock }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(loginMock).toHaveBeenCalledWith(mockToken);
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: 'success' })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
