const finishRecipe = (history, data) => {
  let dataStr = [];
  if (history.location.pathname.includes('/meals')) {
    dataStr = data.strTags.split(',');
  }
  const dateNow = new Date();
  const type = history.location.pathname.includes('/meals') ? 'meal' : 'drink';
  const recipe = {
    id: type === 'meal' ? data.idMeal : data.idDrink,
    nationality: type === 'meal' ? data.strArea : '',
    name: type === 'meal' ? data.strMeal : data.strDrink,
    category: data.strCategory,
    image: type === 'meal' ? data.strMealThumb : data.strDrinkThumb,
    tags: type === 'meal' ? [...dataStr] : dataStr,
    alcoholicOrNot: type === 'drink' ? data.strAlcoholic : '',
    type,
    doneDate: dateNow.toISOString(),
  };
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  doneRecipes.push(recipe);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  history.push('/done-recipes');
};

export default finishRecipe;
