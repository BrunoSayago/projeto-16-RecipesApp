const fetchDetails = async (recipeId, history, setIngredients) => {
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

export default fetchDetails;
