import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

function RecipeDetails(props) {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
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
      setRecipeDetails(data);
    };
    fetchDetails(id);
  }, [id, history.location.pathname]);

  console.log(recipeDetails);
  return (
    <div>
      <h1>{ id }</h1>
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
