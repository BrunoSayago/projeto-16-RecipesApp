import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da Tela de Detalhes da Receita', () => {
  test('Verifica se os elementos são renderizados na tela.', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals/52771');
    });

    const image = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');

    await waitFor(() => expect(image).toBeInTheDocument());
    await waitFor(() => expect(title).toBeInTheDocument());
    await waitFor(() => expect(category).toBeInTheDocument());
    await waitFor(() => expect(instructions).toBeInTheDocument());
    await waitFor(() => expect(video).toBeInTheDocument());
  });

  test('Verifica o vídeo não está presente nos detalhes de um drink.', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks/11007');
    });

    const image = screen.getByTestId('recipe-photo');
    const video = screen.queryByTestId('video');
    await waitFor(() => expect(image).toBeInTheDocument());
    expect(video).toBeNull();
  });
});
