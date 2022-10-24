import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da Tela de Login', () => {
  beforeEach(() => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
  });

  const LOGIN_BUTTON = 'login-submit-btn';
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';

  test('Verifica se os elementos são renderizados na tela.', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(LOGIN_BUTTON);
    expect(emailInput && passwordInput && submitButton).toBeInTheDocument();
  });

  test('Verifica se o botão de login inicia desabilitado', () => {
    const submitButton = screen.getByTestId(LOGIN_BUTTON);
    expect(submitButton).toBeDisabled();
  });

  test('Verifica se o botão é habilitado ao inserir os dados corretamente.', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'user@email.com');
    userEvent.type(passwordInput, '12345678');
    expect(submitButton).toBeEnabled();
  });

  test('Verifica se o usuário é redirecionado.', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'user@email.com');
    userEvent.type(passwordInput, '12345678');
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);
    expect(emailInput).not.toBeInTheDocument();
  });
});
