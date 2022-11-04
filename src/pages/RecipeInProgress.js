import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientsList from '../components/IngredientsList';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

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
        setIngredients(data.meals[0]);
      } else {
        setIngredients(data.drinks[0]);
      }
    };
    fetchDetails(id);
  }, [id, history.location.pathname]);

  const setItems = [];
  const getIngredients = () => {
    const ingrArray = [];
    const measureArray = [];
    Object.getOwnPropertyNames(ingredients).forEach((key) => {
      if (key.includes('strIngredient') && ingredients[key]
      !== '' && ingredients[key] !== null) {
        ingrArray.push(ingredients[key]);
      } else if (key.includes('strMeasure') && ingredients[key]
      !== '' && ingredients[key] !== null) {
        measureArray.push(ingredients[key]);
      }
    });
    ingrArray.forEach((ingr, i) => setItems.push(`${measureArray[i]} ${ingr}`));
  };

  getIngredients();

  return (
    <div>
      <h1>RecipeInProgress</h1>
      {
        history.location.pathname.includes('/meals')
          ? <MealInProgress data={ ingredients } />
          : <DrinkInProgress data={ ingredients } />
      }
      <IngredientsList
        data={ ingredients }
        ingredients={ setItems }
        path={ history.location.pathname }
      />
    </div>
  );
}

export default RecipeInProgress;
