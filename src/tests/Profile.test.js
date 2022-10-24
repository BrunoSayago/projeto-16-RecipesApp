import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';
import Profile from '../pages/Profile';

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

  test('Testa o botão Done Recipes', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const favBtn = screen.getByText('Favorite Recipes');
    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
