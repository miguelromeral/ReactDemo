import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import LoginScreen from './LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

jest.mock('../../../services/AuthService');

describe('LoginScreen', () => {

  const emailPlaceholder = 'name@company.com';
  const passwordPlaceholder = '••••••••';
  const submitForm = jest.fn();

  beforeEach(() => {
    submitForm.mockClear();
    jest.clearAllMocks();
    act(() => {
      render(
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      );
    })
  });

  test('renders correctly', () => {
    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
  });

  
  test('updates the email and password state on input change', () => {
    const inputTextEmail = 'thatsme@mail.com';
    const inputTextPassword = 'myverysecretpassword';

    const inputEmail = screen.getByPlaceholderText(emailPlaceholder);
    fireEvent.change(inputEmail, { target: { value: inputTextEmail } });
    
    const inputPassword = screen.getByPlaceholderText(passwordPlaceholder);
    fireEvent.change(inputPassword, { target: { value: inputTextPassword } });

    expect(inputEmail.value).toBe(inputTextEmail);
    expect(inputPassword.value).toBe(inputTextPassword);
  });


  test('submit the forms successfully', async () => {
    const inputTextEmail = 'thatsme@mail.com';
    const inputTextPassword = 'myverysecretpassword';

    const inputEmail = screen.getByPlaceholderText(emailPlaceholder);
    fireEvent.change(inputEmail, { target: { value: inputTextEmail } });
    
    const inputPassword = screen.getByPlaceholderText(passwordPlaceholder);
    fireEvent.change(inputPassword, { target: { value: inputTextPassword } });

    AuthService.login.mockResolvedValueOnce({ status: true, message: "Login successfully." });

    const submitButton = screen.getByTestId('btnSubmit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith(inputTextEmail, inputTextPassword);
    });
  });
});
