import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Recipes() {
  const [listaReceitas, setListaReceitas] = useState([]);
  const END_POINT_COMIDA = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const END_POINT_BEBIDA = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const fetchData = async () => {
      const sabor = pathname === '/meals' ? END_POINT_COMIDA : END_POINT_BEBIDA;
      const data = await fetch(sabor);
      const results = await data.json();
      const { meals, drinks } = results;
      const tipo = meals || drinks;
      const MAX_POSITION = 12;
      setListaReceitas(tipo.slice(0, MAX_POSITION));
    };
    fetchData();
  }, [pathname]);

  return (
    <div>
      {
        listaReceitas.map((receita, index) => {
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
  );
}

export default Recipes;
