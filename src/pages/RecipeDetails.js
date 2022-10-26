import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';
// import { useHistory } from 'react-router-dom';

function RecipeDetails(props) {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const { history } = props;

  useEffect(() => {
    const fetchDetails = async (recipeId) => {
      let ENDPOINT = '';
      if (history.location.pathname.includes('/meals')) {
        ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      } else {
        ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      }
      const result = await fetch(ENDPOINT);
      const data = await result.json();
      if (history.location.pathname.includes('/meals')) {
        setRecipeDetails(data.meals[0]);
      } else {
        setRecipeDetails(data.drinks[0]);
      }
    };
    const fetchRecommendations = async () => {
      let ENDPOINT = '';
      if (history.location.pathname.includes('/meals')) {
        ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      } else {
        ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      const result = await fetch(ENDPOINT);
      const data = await result.json();
      const i = 6;
      if (history.location.pathname.includes('/meals')) {
        setRecommendations(data.drinks.slice(0, i));
      } else {
        setRecommendations(data.meals.slice(0, i));
      }
    };
    fetchDetails(id);
    fetchRecommendations();
  }, [id, history.location.pathname]);

  return (
    <div>
      {
        history.location.pathname.includes('/meals')
          ? <MealDetails data={ recipeDetails } recommendations={ recommendations } />
          : <DrinkDetails data={ recipeDetails } recommendations={ recommendations } />
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default RecipeDetails;
