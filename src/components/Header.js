import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../context/Context';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const { isSearching, setIsSearching } = useContext(Context);

  const title = () => {
    switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default: return '';
    }
  };

  const searchItem = () => {
    switch (pathname) {
    case '/profile':
      return false;
    case '/done-recipes':
      return false;
    case '/favorite-recipes':
      return false;
    default: return true;
    }
  };

  return (
    <header>
      <h2 data-testid="page-title">{title()}</h2>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="profile-pic"
          data-testid="profile-top-btn"
        />
      </button>
      { searchItem()
          && (
            <button type="button" onClick={ () => setIsSearching(!isSearching) }>
              <img
                src={ searchIcon }
                alt="search"
                data-testid="search-top-btn"
              />
            </button>)}

      {
        isSearching && <SearchBar />
      }

    </header>
  );
}

export default Header;
