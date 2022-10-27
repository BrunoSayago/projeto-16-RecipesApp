import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IngredientsList from './IngredientsList';

function DrinkDetails(props) {
  const { data, recommendations } = props;
  const history = useHistory();
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
      <IngredientsList ingredients={ ingredients } path={ history.location.pathname } />
      <p data-testid="instructions">{ strInstructions }</p>
      <div className="recommendations">
        {
          Array.isArray(recommendations)
            ? recommendations.map((recipe, index) => (
              <div
                key={ index }
                className="recommendation-card"
                data-testid={ `${index}-recommendation-card` }
              >
                <h4
                  data-testid={ `${index}-recommendation-title` }
                >
                  { recipe.strMeal }
                </h4>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
              </div>
            ))
            : null
        }
      </div>
    </div>
  );
}

DrinkDetails.propTypes = {
  data: PropTypes.shape().isRequired,
  recommendations: PropTypes.shape().isRequired,
};

export default DrinkDetails;
