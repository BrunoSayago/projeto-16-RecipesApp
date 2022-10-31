import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconSelected from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');
// import { useHistory } from 'react-router-dom';

function RecipeDetails(props) {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
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

  const verifyDoneRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filteredArray = doneRecipes.filter((recipe) => recipe.id === id);
    if (filteredArray.length > 0) {
      return true;
    }
  };

  const verifyInProgressRecipe = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes !== null) {
      const obj = history.location.pathname.includes('/meals')
        ? inProgressRecipes.meals
        : inProgressRecipes.drinks;
      if (obj[id] !== undefined) {
        return true;
      }
    }
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filterFav = favoriteRecipes.filter((favorite) => favorite.id === id);
    if (filterFav.length > 0) {
      setIsFavorite(true);
    }
  }, [id]);

  const favoriteRecipe = () => {
    const type = history.location.pathname.includes('/meals') ? 'meal' : 'drink';
    const recipe = {
      id,
      type,
      nationality: type === 'meal' ? recipeDetails.strArea : '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: type === 'drink' ? recipeDetails.strAlcoholic : '',
      name: type === 'meal' ? recipeDetails.strMeal : recipeDetails.strDrink,
      image: type === 'meal' ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb,
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filterFav = favoriteRecipes.filter((favorite) => favorite.id === id);
    if (filterFav.length > 0) {
      const filtered = favoriteRecipes.filter((r) => r.id !== filterFav[0].id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    } else {
      favoriteRecipes.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {
        history.location.pathname.includes('/meals')
          ? <MealDetails data={ recipeDetails } recommendations={ recommendations } />
          : <DrinkDetails data={ recipeDetails } recommendations={ recommendations } />
      }
      <span id="message">{null}</span>
      <div className="details-buttons">
        <button
          type="button"
          onClick={ () => {
            copy(window.location.href);
            document.querySelector('#message').innerHTML = 'Link copied!';
          } }
        >
          <img
            src={ shareIcon }
            alt="share-btn"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ favoriteRecipe }
        >
          <img
            src={
              isFavorite ? favoriteIconSelected : favoriteIcon
            }
            alt="favorite-btn"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      {
        verifyDoneRecipe() === true
          ? null
          : (
            <button
              type="button"
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
              onClick={ () => {
                const url = `${history.location.pathname}/in-progress`;
                history.push(url);
              } }
            >
              Start Recipe
            </button>
          )
      }
      {
        verifyInProgressRecipe() === true
          ? (
            <button
              type="button"
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
              onClick={ () => {
                const url = `${history.location.pathname}/in-progress`;
                history.push(url);
              } }
            >
              Continue Recipe
            </button>
          )
          : null
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
