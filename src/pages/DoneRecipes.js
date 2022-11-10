import React from 'react';
import Header from '../components/Header';
// import { useHistory } from 'react-router-dom';

function DoneRecipes() {
  return (
    <div>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
    </div>
  );
}

export default DoneRecipes;
