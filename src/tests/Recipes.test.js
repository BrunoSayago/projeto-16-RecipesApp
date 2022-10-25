import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Provider from '../context/Provider';
import { renderWithRouter } from './helpers/renderWith';
import mockFetch from './helpers/mockFetch';
// import { ToggleButton } from 'react-bootstrap
describe('Testes do componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  test('Testa se a API correta é chamada na página meals', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });
    const teste = screen.getByRole('button', {
      name: /chicken/i,
    });
    expect(teste).toBeInTheDocument();
  });
});
