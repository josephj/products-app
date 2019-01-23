import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import Products from './modules/products';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Container>
          <Switch>
            <Route path="/products" render={() => <Products />} />
            <Redirect to="/products" />} />
          </Switch>
        </Container>
      </HashRouter>
    );
  }
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
`;

export default hot(module)(App);
