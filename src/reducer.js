import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as productsReducer } from './modules/products';

export default history =>
  combineReducers({
    router: connectRouter(history),
    products: productsReducer
  });
