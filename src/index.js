import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';

import './index.css';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" render={() => <App />} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
