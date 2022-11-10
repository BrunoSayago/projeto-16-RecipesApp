import React from 'react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';

describe('Tela Done Recipes', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Testa alguma coisa', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
