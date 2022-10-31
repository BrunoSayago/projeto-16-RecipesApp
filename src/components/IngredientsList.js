import React from 'react';
import PropTypes from 'prop-types';
import '../css/ingredientsList.css';

function IngredientsList(props) {
  const { ingredients, path } = props;

  return (
    path.includes('in-progress')
      ? (
        <div>
          { ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor="ingredient"
            >
              <input
                type="checkbox"
                className="ingredients-list"
                name={ `${index}-ingredient-step` }
              />
              <span>{ ingredient }</span>

            </label>
          )) }
        </div>

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
