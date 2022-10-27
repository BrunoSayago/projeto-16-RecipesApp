import React from 'react';
import { useHistory } from 'react-router-dom';
import IngredientsList from '../components/IngredientsList';

// import { useHistory } from 'react-router-dom';

function RecipeInProgress() {
  const history = useHistory();
  const ingredients = [
    '3/4 cup soy sauce',
    '1/2 cup water',
    '1/4 cup brown sugar',
    '1/2 teaspoon ground ginger',
    '1/2 teaspoon minced garlic',
    '4 Tablespoons cornstarch',
    '2 chicken breasts',
    '1 (12 oz.) stir-fry vegetables',
    '3 cups brown rice',
  ];

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <IngredientsList ingredients={ ingredients } path={ history.location.pathname } />
    </div>
  );
}

export default RecipeInProgress;
