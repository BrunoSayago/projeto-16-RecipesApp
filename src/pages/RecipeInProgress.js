import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientsList from '../components/IngredientsList';
import MealInProgress from '../components/MealInProgress';
import DrinkInProgress from '../components/DrinkInProgress';
import fetchDetails from './services/fetchDetails';
import getIngredients from './services/getIngredients';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchDetails(id, history, setIngredients);
  }, [id, history]);

  const setItems = [];

  getIngredients(ingredients, setItems);

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
