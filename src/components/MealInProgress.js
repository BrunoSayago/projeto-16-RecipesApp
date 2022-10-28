import React from 'react';
import PropTypes from 'prop-types';

function MealInProgress(props) {
  const { data } = props;
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = data;

  return (
    <div>
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
        width="100%"
      />
      <p data-testid="instructions">{ strInstructions }</p>
      <p data-testid="recipe-category">{ strCategory }</p>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </div>
  );
}

MealInProgress.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default MealInProgress;
