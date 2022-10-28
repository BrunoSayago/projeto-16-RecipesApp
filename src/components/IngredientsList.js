import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { ingredients, path } = props;

  return (
    path.includes('in-progress')
      ? (
        <ul>
          { ingredients.map((ingredient, index) => (
            <li key={ index }>
              <input
                type="checkbox"
                data-testid={ `${index}-ingredient-step` }
                id={ `${index}-ingredient-step` }
                name={ `${index}-ingredient-step` }
              />
              <label htmlFor={ `${index}-ingredient-step` }>
                { ingredient }
              </label>
            </li>
          )) }
        </ul>
      )
      : (
        <ul>
          { ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { ingredient }
            </li>
          )) }
        </ul>
      )
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default IngredientsList;
