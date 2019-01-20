import {
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
      const boundActionCreators = mapDispatchToProps(dispatch, actionCreators);
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
