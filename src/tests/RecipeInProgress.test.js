import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da Tela de progresso', () => {
  test('Verifica os elementos renderizados na tela RecipeInProgress', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals/52771/in-progress');
    });

    const image = screen.getByTestId('recipe-photo');
    const ingredient = screen.getByTestId('0-ingredient-step');

    await waitFor(() => expect(image).toBeInTheDocument());
    await waitFor(() => expect(ingredient).toBeInTheDocument());
  });

  test('Verifica o RecipeInProgress de um drink.', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks/11007/in-progress');
    });

    const image = screen.getByTestId('recipe-photo');
    await waitFor(() => expect(image).toBeInTheDocument());
  });
});
