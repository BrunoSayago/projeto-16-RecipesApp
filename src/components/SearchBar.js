import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function SearchBar() {
  const history = useHistory();
  const { pathname } = history.location;
  const [radioSelected, setRadioSelected] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const { setRetornoSearch } = useContext(Context);

  const mudaRadio = (event) => {
    const selected = event.target.value;
    setRadioSelected(selected);
  };

  const firstLetter = 'first-letter';

  const handleSearchInput = (evento) => {
    const pesquisa = evento.target.value;
    setSearchInput(pesquisa);
  };

  const APIfoods = (radio) => {
    switch (radio) {
    case 'name':
      return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    case firstLetter:
      return 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    default:
      return 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    }
  };

  const APIdrinks = (radio) => {
    switch (radio) {
    case 'name':
      return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    case firstLetter:
      return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    default:
      return 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    }
  };

  const filtraSearchBar = async () => {
    if (radioSelected === firstLetter && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const linkAPI = pathname === '/meals'
      ? APIfoods(radioSelected) : APIdrinks(radioSelected);
    const searchLink = `${linkAPI}${searchInput}`;
    const dados = await fetch(searchLink);
    const resultados = await dados.json();
    console.log(resultados);
    const { meals, drinks } = resultados;
    // console.log(meals);
    // console.log(drinks);
    if ((meals === undefined || meals === null)
      && (drinks === undefined || drinks === null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      const tipo = meals || drinks;
      setRetornoSearch(tipo);
      if (tipo.length === 1) {
        const id = pathname === '/meals' ? tipo[0].idMeal : tipo[0].idDrink;
        const diretorio = `${pathname}/${id}`;
        history.push(diretorio);
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleSearchInput }
        />
      </div>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="search-bar-option"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          defaultChecked
          onClick={ mudaRadio }
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="search-bar-option"
          data-testid="name-search-radio"
          value="name"
          onClick={ mudaRadio }
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          name="search-bar-option"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onClick={ mudaRadio }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ filtraSearchBar }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
