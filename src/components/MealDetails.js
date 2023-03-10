import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IngredientsList from './IngredientsList';

function MealDetails(props) {
  const { data, recommendations } = props;
  const history = useHistory();
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = data;

  let videoUrl = '';
  if (strYoutube) {
    videoUrl = strYoutube.replace(/https:\/\/www\.youtube\.com\/watch\?v=/, 'https://www.youtube.com/embed/');
  }

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
        src={ strMealThumb }
        alt={ strMeal }
        width="100%"
      />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <p data-testid="recipe-category">{ strCategory }</p>
      <IngredientsList ingredients={ ingredients } path={ history.location.pathname } />
      <p data-testid="instructions">{ strInstructions }</p>
      <iframe
        data-testid="video"
        width="320"
        height="210"
        src={ videoUrl }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
      />
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
                  { recipe.strDrink }
                </h4>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
              </div>
            ))
            : null
        }
      </div>
    </div>
  );
}

MealDetails.propTypes = {
  data: PropTypes.shape().isRequired,
  recommendations: PropTypes.shape().isRequired,
};

export default MealDetails;
