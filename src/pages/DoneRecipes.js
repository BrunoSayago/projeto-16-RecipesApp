import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  return (
    <div>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes && doneRecipes.map((item, index) => (
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
          <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt=""
          />
          {item.tags.map((tag, i) => (
            <p
              key={ i }
              data-testid={ `${i}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
