import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  test('Testa o header', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    await waitFor(() => expect(searchInput).toBeInTheDocument());

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });

  test('Testa o header no done-recipes', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).not.toBeInTheDocument();
  });
  test('Testa o header no done-recipes', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });
});
