import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import { Alert } from 'bootstrap';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import mealsIngredientMock from './helpers/mealsIngredientMock';
import mealsNameMock from './helpers/mealsNameMock';
import mealsFirstMock from './helpers/mealsFirstMock';
import drinksIngredientMock from './helpers/drinksIngredientMock';
import drinksNameMock from './helpers/drinksNameMock';
import drinksFirstMock from './helpers/drinksFirstMock';

const idTestInput = 'search-input';
const idTestIngredient = 'ingredient-search-radio';
const idTestName = 'name-search-radio';
const idTestFirst = 'first-letter-search-radio';
const idTestSearchBtn = 'exec-search-btn';

const primeiraReceita = '0-card-name';
const segundaReceita = '1-card-name';

const clicaBtnInicio = () => {
  const inicioBtn = screen.getByTestId('search-top-btn');
  userEvent.click(inicioBtn);
};

describe('Testa o componente SearchBar', () => {
  afterEach(() => jest.restoreAllMocks());

  test('Teste 1 - Testa se os componentes são renderizados', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const ingredientRadio = screen.getByTestId(idTestIngredient);
    const nameRadio = screen.getByTestId(idTestName);
    const firstRadio = screen.getByTestId(idTestFirst);
    const searchBtn = screen.getByTestId(idTestSearchBtn);

    expect(input).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Teste 2 - Testa se a API (meals, ingredient) é chamada corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    await act(async () => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    userEvent.type(input, 'chicken');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'));
  });

  test('Teste 3 - Testa se a API (meals, name) é chamada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    await act(async () => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const nameRadio = screen.getByTestId(idTestName);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    userEvent.click(nameRadio);
    userEvent.type(input, 'chicken');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'));
  });

  test('Teste 4 - Testa se a API (meals, first letter) é chamada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    await act(async () => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const firstRadio = screen.getByTestId(idTestFirst);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    userEvent.click(firstRadio);
    userEvent.type(input, 'c');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c'));
  });

  test('Teste 5 - Testa se a API (drinks, ingredient) é chamada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    await act(async () => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    userEvent.type(input, 'lemon');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'));
  });

  test('Teste 6 - Testa se a API (drinks, name) é chamada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    await act(async () => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const nameRadio = screen.getByTestId(idTestName);
    userEvent.click(nameRadio);
    userEvent.type(input, 'lemon');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon'));
  });

  test('Teste 7 - Testa se a API (drinks, first letter) é chamada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    await act(async () => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const firstRadio = screen.getByTestId(idTestFirst);
    userEvent.click(firstRadio);
    userEvent.type(input, 'l');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l'));
  });

  test('Teste 8 - Testa se a API (meals, ingredients) renderiza corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsIngredientMock),
    });
    act(() => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    userEvent.type(input, 'banana');
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsIngredientMock),
    });
    const firstRecipe = await screen.findByTestId(primeiraReceita);
    const secondRecipe = await screen.findByTestId(segundaReceita);
    await waitFor(() => expect(firstRecipe).toBeInTheDocument());
    await waitFor(() => expect(firstRecipe).toHaveTextContent('Banana Pancakes'));
    await waitFor(() => expect(secondRecipe).toBeInTheDocument());
    await waitFor(() => expect(secondRecipe).toHaveTextContent('Callaloo Jamaican Style'));
  });

  test('Teste 9 - Testa se a API (meals, name) renderiza corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsNameMock),
    });
    act(() => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const nameRadio = screen.getByTestId(idTestName);
    userEvent.click(nameRadio);
    userEvent.type(input, 'hot');
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsNameMock),
    });
    const firstRecipe = await screen.findByTestId(primeiraReceita);
    const secondRecipe = await screen.findByTestId(segundaReceita);
    await waitFor(() => expect(firstRecipe).toBeInTheDocument());
    await waitFor(() => expect(firstRecipe).toHaveTextContent('Lancashire hotpot'));
    await waitFor(() => expect(secondRecipe).toBeInTheDocument());
    await waitFor(() => expect(secondRecipe).toHaveTextContent('Bean & Sausage Hotpot'));
  });

  test('Teste 10 - Testa se a API (meals, first letter) renderiza corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsFirstMock),
    });
    act(() => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const firstRadio = screen.getByTestId(idTestFirst);
    userEvent.click(firstRadio);
    userEvent.type(input, 'w');
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsFirstMock),
    });
    const firstRecipe = await screen.findByTestId(primeiraReceita);
    const secondRecipe = await screen.findByTestId(segundaReceita);
    await waitFor(() => expect(firstRecipe).toBeInTheDocument());
    await waitFor(() => expect(firstRecipe).toHaveTextContent('White chocolate creme brulee'));
    await waitFor(() => expect(secondRecipe).toBeInTheDocument());
    await waitFor(() => expect(secondRecipe).toHaveTextContent('Wontons'));
  });

  test('Teste 11 - Testa se a API (drinks, ingredient) renderiza corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksIngredientMock),
    });
    act(() => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    userEvent.type(input, 'port');
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksIngredientMock),
    });
    const firstRecipe = await screen.findByTestId(primeiraReceita);
    const secondRecipe = await screen.findByTestId(segundaReceita);
    await waitFor(() => expect(firstRecipe).toBeInTheDocument());
    await waitFor(() => expect(firstRecipe).toHaveTextContent('Chicago Fizz'));
    await waitFor(() => expect(secondRecipe).toBeInTheDocument());
    await waitFor(() => expect(secondRecipe).toHaveTextContent('Port Wine Cocktail'));
  });

  test('Teste 12 - Testa se a API (drinks, name) renderiza corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksNameMock),
    });
    act(() => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const nameRadio = screen.getByTestId(idTestName);
    userEvent.click(nameRadio);
    userEvent.type(input, 'b-');
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksNameMock),
    });
    const firstRecipe = await screen.findByTestId(primeiraReceita);
    const secondRecipe = await screen.findByTestId(segundaReceita);
    await waitFor(() => expect(firstRecipe).toBeInTheDocument());
    await waitFor(() => expect(firstRecipe).toHaveTextContent('B-53'));
    await waitFor(() => expect(secondRecipe).toBeInTheDocument());
    await waitFor(() => expect(secondRecipe).toHaveTextContent('B-52'));
  });

  test('Teste 13 - Testa se a API (drinks, first letter) renderiza corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksFirstMock),
    });
    act(() => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const firstRadio = screen.getByTestId(idTestFirst);
    userEvent.click(firstRadio);
    userEvent.type(input, 'y');
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksFirstMock),
    });
    const firstRecipe = await screen.findByTestId(primeiraReceita);
    const secondRecipe = await screen.findByTestId(segundaReceita);
    await waitFor(() => expect(firstRecipe).toBeInTheDocument());
    await waitFor(() => expect(firstRecipe).toHaveTextContent('Yellow Bird'));
    await waitFor(() => expect(secondRecipe).toBeInTheDocument());
    await waitFor(() => expect(secondRecipe).toHaveTextContent('Yoghurt Cooler'));
  });

  test('Teste 14 - Testa se é renderizado pra pagina de detalhes quando há só uma receita meals', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const firstRadio = screen.getByTestId(idTestFirst);
    userEvent.click(firstRadio);
    userEvent.type(input, 'y');
    userEvent.click(searchBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52871'));
  });

  test('Teste 15 - Testa se é renderizado pra pagina de detalhes quando há só uma receita drinks', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const nameRadio = screen.getByTestId(idTestName);
    userEvent.click(nameRadio);
    userEvent.type(input, 'abc');
    userEvent.click(searchBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/13501'));
  });

  test('Teste 16 - Testa se é renderizado o alert ao digitar mais de uma letra no first letter (meals)', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    global.alert = jest.fn();
    act(() => {
      history.push('/meals');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const firstRadio = screen.getByTestId(idTestFirst);
    userEvent.click(firstRadio);
    userEvent.type(input, 'abc');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
  });

  test('Teste 17 - Testa se é renderizado o alert ao digitar mais de uma letra no first letter (drinks)', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    global.alert = jest.fn();
    act(() => {
      history.push('/drinks');
    });

    clicaBtnInicio();
    const input = screen.getByTestId(idTestInput);
    const searchBtn = screen.getByTestId(idTestSearchBtn);
    const firstRadio = screen.getByTestId(idTestFirst);
    userEvent.click(firstRadio);
    userEvent.type(input, 'abc');
    userEvent.click(searchBtn);
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
  });
});
