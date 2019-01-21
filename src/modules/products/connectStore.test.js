import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import connectStore, {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from './connectStore';

describe('connectStore', () => {
  describe('mapStateToProps', () => {
    it('returns an object literal which contains data, total, page, and limit fields', () => {
      const store = {
        products: {
          data: Array(1000),
          meta: {
            page: 1,
            limit: 10
          }
        }
      };
      const result = mapStateToProps(store);
      expect(result.data).toHaveLength(10);
      expect(result.total).toEqual(1000);
      expect(result).not.toHaveProperty('meta');
      expect(result).toHaveProperty('total');
    });
  });

  describe('mapDispatchToProps', () => {
    it('binds the dispatch to action creators', () => {
      const dispatch = jest.fn();
      const actionCreators = {
        foo: () => {},
        bar: () => {}
      };
      const boundActionCreators = mapDispatchToProps(
        dispatch,
        {},
        actionCreators
      );
      boundActionCreators.foo();
      boundActionCreators.bar();
      expect(dispatch).toBeCalledTimes(2);
    });
  });

  describe('mergeProps', () => {
    const dispatchProps = {
      retrieveProducts: jest.fn(),
      setLimit: jest.fn(),
      setPage: jest.fn()
    };
    const stateProps = {
      foo: 1,
      bar: 2
    };
    it('returns the original stateProps', () => {
      const result = mergeProps(stateProps, {});
      expect(result.foo).toEqual(1);
      expect(result.bar).toEqual(2);
    });
    it('returns the onWillMount, onLimitChange, and onPageChange callbacks', () => {
      const stateProps = {
        foo: 1,
        bar: 2
      };
      const result = mergeProps(stateProps, dispatchProps);
      result.onWillMount();
      expect(dispatchProps.retrieveProducts).toHaveBeenCalled();
      result.onLimitChange(24);
      expect(dispatchProps.setLimit).toHaveBeenCalledWith(24);
      result.onPageChange(2);
      expect(dispatchProps.setPage).toHaveBeenCalledWith(2);
    });
  });
});

// Integration test for the HoC component
describe('connectStore', () => {
  it('appends props to assigned component', () => {
    const store = configureStore()({
      products: {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        meta: {
          page: 1,
          limit: 10
        }
      }
    });
    const Foo = ({
      data,
      total,
      limit,
      page,
      onLimitChange,
      onWillMount,
      onPageChange
    }) => {
      expect(page).toEqual(1);
      expect(limit).toEqual(10);
      expect(total).toEqual(15);
      expect(data).toHaveLength(10);
      expect(onLimitChange).toBeInstanceOf(Function);
      expect(onWillMount).toBeInstanceOf(Function);
      expect(onPageChange).toBeInstanceOf(Function);

      return null;
    };
    const ConnectedFoo = connectStore(Foo);
    mount(
      <Provider store={store}>
        <ConnectedFoo />
      </Provider>
    );
  });
});
