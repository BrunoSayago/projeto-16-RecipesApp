import React from 'react';
// import { useHistory } from 'react-router-dom';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <Header />
      <h1>Meals</h1>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
