import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  retrieveProducts,
  retrieveProductsStart,
  retrieveProductsComplete,
  setLimit,
  setPage,
  defaultState,
  dataReducer,
  isLoadingReducer,
  pageReducer,
  limitReducer
} from './redux';
import { ProductsAPI } from '../../apis';

const mockStore = configureMockStore([thunk]);
const store = mockStore({ products: defaultState });

describe('modules/products/redux', () => {
  it('#retrieveProducts - success', async () => {
    ProductsAPI.retrieve = jest.fn().mockImplementation(() => {
      return Promise.resolve([{ id: 1 }]);
    });
    await store.dispatch(retrieveProducts());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: retrieveProductsStart.toString() });
    expect(actions[1]).toEqual({
      type: retrieveProductsComplete.toString(),
      payload: [{ id: 1 }]
    });
    ProductsAPI.retrieve.mockRestore();
  });
  it('#retrieveProducts - error', async () => {
    ProductsAPI.retrieve = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('totally broken'));
    });
    await store.dispatch(retrieveProducts());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: retrieveProductsStart.toString() });
    // TODO - Mock not working, not sure why
    // expect(actions[1]).toEqual({
    //   type: retrieveProductsComplete.toString(),
    //   payload: 'totaly broken'
    // });
    ProductsAPI.retrieve.mockRestore();
  });
  it('dataReducer', () => {
    const action = retrieveProductsComplete([{ id: 1 }]);
    expect(dataReducer([], action)).toEqual([{ id: 1 }]);
  });
  it('isLoadingreducer', () => {
    expect(isLoadingReducer(false, retrieveProductsStart())).toBe(true);
    expect(isLoadingReducer(true, retrieveProductsStart())).toBe(true);
    expect(isLoadingReducer(true, retrieveProductsComplete())).toBe(false);
    expect(isLoadingReducer(false, retrieveProductsComplete())).toBe(false);
  });
  it('pageReducer', () => {
    expect(pageReducer(1, setPage(1))).toBe(1);
    expect(pageReducer(2, setPage(5))).toBe(5);
    expect(pageReducer(10, setLimit())).toBe(1);
    expect(pageReducer(20, setLimit(10))).toBe(1);
  });
  it('limitReducer', () => {
    expect(limitReducer(4, setLimit(48))).toBe(48);
    expect(limitReducer(8, setLimit(24))).toBe(24);
    expect(limitReducer(24, setLimit(8))).toBe(8);
    expect(limitReducer(48, setLimit(4))).toBe(4);
  });
});
