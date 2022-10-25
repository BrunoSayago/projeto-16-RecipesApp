import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';
import foodData from './helpers/mockData';
import drinks from '../../cypress/mocks/drinks';
// import { ToggleButton } from 'react-bootstrap

describe('Testes do componente Recipes', () => {
  test('Testa se a API correta é chamada na página meals', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodData),
    });
    act(() => {
      history.push('/meals');
    });
    const text = screen.getAllByText('Meals');
    expect(text[1]).toBeInTheDocument();
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
    userEvent.click(corba);
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
  });
});
