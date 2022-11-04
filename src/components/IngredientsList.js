import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/ingredientsList.css';

function IngredientsList(props) {
  const { ingredients, path } = props;
  const [disableBtn, setDisableBtn] = useState(true);
  const [checks, setChecked] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (checks === ingredients.length) {
      setDisableBtn(false);
    }
    if (checks !== ingredients.length) {
      setDisableBtn(true);
    }
  }, [ingredients, checks]);

  const finishRecipe = () => {
    history.push('/done-recipes');
  };

  const handleCheck = (event) => {
    if (event.target.checked === true) {
      setChecked(checks + 1);
    } else {
      setChecked(checks - 1);
    }
  };

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
                onChange={ (event) => handleCheck(event) }
                className="ingredients-list"
                name={ `${index}-ingredient-step` }
              />
              <span>{ ingredient }</span>

            </label>
          )) }
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ disableBtn }
            onClick={ finishRecipe }
          >
            Finish Recipe
          </button>
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
