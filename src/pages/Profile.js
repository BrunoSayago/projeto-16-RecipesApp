import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const tempEmail = () => {
    const temp = {
      email: 'email@mail.com',
    };
    localStorage.setItem('user', JSON.stringify(temp));
    const text = localStorage.getItem('user');
    const email = JSON.parse(text);
    return email.email;
  };

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <div>
        <p data-testid="profile-email">
          {tempEmail()}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
