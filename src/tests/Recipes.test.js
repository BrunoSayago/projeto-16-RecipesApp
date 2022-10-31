import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

describe('Testes do componente Recipes', () => {
  test('Testa se a API correta é chamada na página meals', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    act(() => {
      history.push('/meals');
    });
    const text = screen.getAllByText('Meals');
    expect(text[1]).toBeInTheDocument();
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
    userEvent.click(corba);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });

  test('Testa se a API correta é chamada na página drinks', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    act(() => {
      history.push('/drinks');
    });
    const text = screen.getAllByText('Drinks');
    expect(text[1]).toBeInTheDocument();
    const drink = await screen.findByText('GG');
    expect(drink).toBeInTheDocument();
    userEvent.click(drink);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997'));
  });

  test('Testa os filtros da página meals', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    act(() => {
      history.push('/meals');
    });
    const text = await screen.findByTestId('Pasta-category-filter');
    expect(text).toBeInTheDocument();
    userEvent.click(text);
    const kumpir = await screen.findByText('Kumpir');
    expect(kumpir).toBeInTheDocument();
    userEvent.click(text);
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn);
    expect(corba).toBeInTheDocument();
  });

  test('Testa os filtros da página drinks', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    act(() => {
      history.push('/drinks');
    });
    const text = await screen.findByTestId('Cocktail-category-filter');
    expect(text).toBeInTheDocument();
    userEvent.click(text);
    const a1 = await screen.findByText('A1');
    expect(a1).toBeInTheDocument();
    userEvent.click(a1);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/17222'));
  });

  test('Testa a quantidade de receitas retornadas', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    act(() => {
      history.push('/meals');
    });
    const text = await screen.findByTestId('Pasta-category-filter');
    expect(text).toBeInTheDocument();
    userEvent.click(text);
  });
});
