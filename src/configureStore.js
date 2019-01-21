import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createRootReducer from './reducer';

export const history = createHashHistory();

let middlewares = [routerMiddleware(history), thunk];
const env = process.env.REACT_APP_ENV || process.env.NODE_ENV;
if (env === 'development') {
  middlewares.push(logger);
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}
