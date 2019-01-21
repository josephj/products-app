import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { ProductsAPI } from '../../apis';

const PREFIX = 'products';

export const retrieveProducts = () => dispatch => {
  dispatch(retrieveProductsStart());
  ProductsAPI.retrieve()
    .then(data => {
      dispatch(retrieveProductsComplete(data));
    })
    .catch(err => {
      dispatch(retrieveProductsComplete(err));
    });
};
export const retrieveProductsStart = createAction(
  `${PREFIX}/RETRIEVE_PRODUCTS_START`
);
export const retrieveProductsComplete = createAction(
  `${PREFIX}/RETRIEVE_PRODUCTS_COMPLETE`
);
export const setLimit = createAction(`${PREFIX}/SET_LIMIT`);
export const setPage = createAction(`${PREFIX}/SET_PAGE`);

export const defaultState = {
  data: [],
  meta: {
    isLoading: false,
    page: 1,
    limit: 8
  }
};

export const dataReducer = handleAction(
  retrieveProductsComplete,
  (state, { payload }) => payload,
  defaultState.data
);
export const isLoadingReducer = handleActions(
  {
    [retrieveProductsStart]: () => true,
    [retrieveProductsComplete]: () => false
  },
  defaultState.meta.isLoading
);
export const pageReducer = handleActions(
  {
    [setPage]: (state, { payload }) => payload,
    [setLimit]: () => 1
  },
  defaultState.meta.page
);
export const limitReducer = handleActions(
  {
    [setLimit]: (state, { payload }) => payload
  },
  defaultState.meta.limit
);

export default combineReducers({
  data: dataReducer,
  meta: combineReducers({
    isLoading: isLoadingReducer,
    page: pageReducer,
    limit: limitReducer
  })
});
