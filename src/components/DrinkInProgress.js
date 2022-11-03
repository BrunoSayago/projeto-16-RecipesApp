import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIconSelected from '../images/blackHeartIcon.svg';

function DrinkInProgress(props) {
  const { id } = useParams();
  const { data } = props;
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = data;

  const history = useHistory();
  const { pathname } = history.location;
  const splitedPathname = pathname.split('/');
  const [shareClick, setShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const clickShare = () => {
    console.log(data);
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
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
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
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
        width="100%"
      />
      <p data-testid="instructions">{ strInstructions }</p>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
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
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
      {shareClick && <p>Link copied!</p>}
    </div>
  );
}

DrinkInProgress.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DrinkInProgress;
