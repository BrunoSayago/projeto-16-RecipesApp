import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';
import Profile from '../pages/Profile';
import App from '../App';

describe('testa Profile', () => {
  test('Testa o botão logout', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const logoutBtn = screen.getByText('Logout');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa o botão Done Recipes', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const doneBtn = screen.getByText('Done Recipes');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa o botão Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const favBtn = screen.getByText('Favorite Recipes');
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa o caminho todo', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'user@email.com');
    userEvent.type(passwordInput, '12345678');
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);
    expect(history.location.pathname).toBe('/meals');
    act(() => {
      history.push('/profile');
    });
  });
});
