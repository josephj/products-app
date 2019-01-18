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
  `${PREFIX}/RECEIVE_PRODUCTS_COMPLETE`
);
export const setLimit = createAction(`${PREFIX}/SET_LIMIT`);
export const setPage = createAction(`${PREFIX}/SET_PAGE`);

const defaultState = {
  data: [],
  meta: {
    isLoading: false,
    page: 1,
    limit: 8
  }
};

export default combineReducers({
  data: handleAction(
    retrieveProductsComplete,
    (state, { payload }) => payload,
    defaultState.data
  ),
  meta: combineReducers({
    isLoading: handleActions(
      {
        [retrieveProductsStart]: () => true,
        [retrieveProductsComplete]: () => false
      },
      defaultState.meta.isLoading
    ),
    page: handleActions(
      {
        [setPage]: (state, { payload }) => payload,
        [setLimit]: () => 1
      },
      defaultState.meta.page
    ),
    limit: handleActions(
      {
        [setLimit]: (state, { payload }) => payload
      },
      defaultState.meta.limit
    )
  })
});
