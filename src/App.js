import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router';
import Products from './modules/products';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/products" render={() => <Products />} />
          <Redirect to="/products" />} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
