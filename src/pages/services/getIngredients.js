const getIngredients = (ingredients, setItems) => {
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

export default getIngredients;
