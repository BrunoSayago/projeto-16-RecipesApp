import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Recipes() {
  const [listaReceitas, setListaReceitas] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('');

  const END_POINT_COMIDA = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const END_POINT_BEBIDA = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const END_POINT_CAT_COMIDA = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const END_POINT_CAT_BEBIDA = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const fetchReceitas = async () => {
      const sabor = pathname === '/meals' ? END_POINT_COMIDA : END_POINT_BEBIDA;
      const data = await fetch(sabor);
      const results = await data.json();
      const { meals, drinks } = results;
      const tipo = meals || drinks;
      const MAX_POSITION = 12;
      setListaReceitas(tipo.slice(0, MAX_POSITION));
    };
    fetchReceitas();
  }, [pathname]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const sabor = pathname === '/meals' ? END_POINT_CAT_COMIDA : END_POINT_CAT_BEBIDA;
      const data = await fetch(sabor);
      const results = await data.json();
      const { meals, drinks } = results;
      const tipo = meals || drinks;
      const MAX_POSITION = 5;
      setListaCategorias(tipo.slice(0, MAX_POSITION));
    };
    fetchCategorias();
  }, [pathname]);

  const handleFilterCategory = (event) => {
    const fetchFiltered = async () => {
      const END_POINT = pathname === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${event.target.innerText}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${event.target.innerText}`;
      const data = await fetch(END_POINT);
      const results = await data.json();
      const { meals, drinks } = results;
      const tipo = meals || drinks;
      const MAX_POSITION = 12;
      setCategoriaFiltrada(tipo.slice(0, MAX_POSITION));
    };
    fetchFiltered();
  };

  const handleAllButton = () => {
    setCategoriaFiltrada('');
  };

  return (
    <div>
      <div>
        {
          listaCategorias.map((categoria) => (
            <button
              type="button"
              data-testid={ `${categoria.strCategory}-category-filter` }
              key={ `${categoria.strCategory}-category-filter` }
              onClick={ handleFilterCategory }
            >
              {categoria.strCategory}
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllButton }
        >
          All
        </button>
      </div>

      <div>
        {
          (categoriaFiltrada || listaReceitas)
            .map((receita, index) => {
              const objNomes = pathname === '/meals' ? {
                id: 'idMeal',
                nome: 'strMeal',
                imagem: 'strMealThumb',
              } : {
                id: 'idDrink',
                nome: 'strDrink',
                imagem: 'strDrinkThumb',
              };
              return (
                <div data-testid={ `${index}-recipe-card` } key={ receita[objNomes.id] }>
                  <p data-testid={ `${index}-card-name` }>{receita[objNomes.nome]}</p>
                  <img
                    data-testid={ `${index}-card-img` }
                    className="card-img"
                    src={ receita[objNomes.imagem] }
                    alt={ `${receita.strMeal} imagem` }
                  />
                </div>
              );
            })
        }
      </div>

    </div>
  );
}

export default Recipes;
