import React from 'react';
// import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header />
      <h1>Drinks</h1>
      <Recipes />
    </div>
  );
}

export default Drinks;
