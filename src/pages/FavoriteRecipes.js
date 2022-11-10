import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
// import favoriteIconSelected from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meal
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favoriteRecipes && favoriteRecipes.map((item, index) => (
        <div key={ index }>
          <img
            width="100px"
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt="item"
          />
          {item.type === 'meal'
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${item.nationality} - ${item.category}`}
              </p>
            ) : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${item.alcoholicOrNot}`}

              </p>
            )}
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt=""
          />
          <img
            src={ favoriteIcon }
            alt="favorite-btn"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
