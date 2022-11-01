import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider(props) {
  const { children } = props;
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('');
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [retornoSearch, setRetornoSearch] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    if (categoriaEscolhida) {
      const fetchFiltered = async () => {
        const END_POINT = pathname === '/meals'
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaEscolhida}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoriaEscolhida}`;
        const data = await fetch(END_POINT);
        const results = await data.json();
        const { meals, drinks } = results;
        const tipo = meals || drinks;
        const MAX_POSITION = 12;
        setCategoriaFiltrada(tipo.slice(0, MAX_POSITION));
      };
      fetchFiltered();
    } else {
      setCategoriaFiltrada('');
    }
  }, [categoriaEscolhida, pathname]);

  const value = useMemo(() => ({
    isSearching,
    setIsSearching,
    retornoSearch,
    setRetornoSearch,
    categoriaEscolhida,
    setCategoriaEscolhida,
    categoriaFiltrada,
    setCategoriaFiltrada,
  }), [categoriaEscolhida, isSearching, retornoSearch, categoriaFiltrada]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
