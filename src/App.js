import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Products from './modules/products';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/products" render={() => <Products />} />
          <Redirect to="/products" />} />
        </Switch>
      </HashRouter>
    );
  }
}

export default hot(module)(App);
