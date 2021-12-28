import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';
import Layout from '../components/Layout';

const App = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={isLogged ? Home : Login} />
          <Route exact path="/player/:id" component={isLogged ? Player : Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
