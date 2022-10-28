import React from 'react';
import PropTypes from 'prop-types';

function DrinkInProgress(props) {
  const { data } = props;
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = data;
  return (
    <div>
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
        width="100%"
      />
      <p data-testid="instructions">{ strInstructions }</p>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
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

DrinkInProgress.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DrinkInProgress;
