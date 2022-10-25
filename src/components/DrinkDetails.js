import React from 'react';
import PropTypes from 'prop-types';

function DrinkDetails(props) {
  const { data } = props;
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = data;

  const ingredients = [];

  const getIngredients = () => {
    const ingrArray = [];
    const measureArray = [];
    Object.getOwnPropertyNames(data).forEach((key) => {
      if (key.includes('strIngredient') && data[key] !== '' && data[key] !== null) {
        ingrArray.push(data[key]);
      } else if (key.includes('strMeasure') && data[key] !== '' && data[key] !== null) {
        measureArray.push(data[key]);
      }
    });
    ingrArray.forEach((ingr, i) => ingredients.push(`${measureArray[i]} ${ingr}`));
  };

  getIngredients();

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
        width="100%"
      />
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
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
      <p data-testid="instructions">{ strInstructions }</p>
    </div>
  );
}

DrinkDetails.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DrinkDetails;
