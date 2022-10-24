import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';

describe('testa Profile', () => {
  it('Testa o botão logout', () => {
    render(<Profile />);
    const logoutBtn = screen.getByText('Logout');
    const doneBtn = screen.getByText('Done Recipes');
    const favBtn = screen.getByText('Favorite Recipes');
    expect(logoutBtn).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
  });
});
