import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
