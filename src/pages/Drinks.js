import React from 'react';
import Footer from '../components/Footer';
// import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header />
      <h1>Drinks</h1>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
