import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconSelected from '../images/blackHeartIcon.svg';

function MealInProgress(props) {
  const { id } = useParams();
  const { data } = props;
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = data;
  const history = useHistory();
  const { pathname } = history.location;
  const splitedPathname = pathname.split('/');
  const [shareClick, setShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const clickShare = () => {
    clipboardCopy(`http://localhost:3000/${splitedPathname[1]}/${splitedPathname[2]}`);
    setShare(true);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filterFav = favoriteRecipes.filter((favorite) => favorite.id === id);
    if (filterFav.length > 0) {
      setIsFavorite(true);
    }
  }, [id]);

  const favoriteRecipe = () => {
    const recipe = {
      id: data.idMeal,
      type: 'meal',
      nationality: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
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
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
        width="100%"
      />
      <p data-testid="instructions">{ strInstructions }</p>
      <p data-testid="recipe-category">{ strCategory }</p>
      <button
        type="button"
        onClick={ () => clickShare() }
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
      {shareClick && <p>Link copied!</p>}
    </div>
  );
}

MealInProgress.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default MealInProgress;
