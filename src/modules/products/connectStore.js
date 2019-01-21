import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveProducts, setLimit, setPage } from './redux';

export const mapStateToProps = store => {
  const {
    data,
    meta,
    meta: { page, limit }
  } = store.products;
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: data.slice(start, end),
    total: data.length,
    ...meta
  };
};

export const mapDispatchToProps = (dispatch, ownProps, actionCreators) => {
  // Dependency injection for unit test
  actionCreators = actionCreators || {
    retrieveProducts,
    setLimit,
    setPage
  };
  return bindActionCreators(actionCreators, dispatch);
};

export const mergeProps = (stateProps, dispatchProps) => {
  const { retrieveProducts, setLimit, setPage } = dispatchProps;
  return {
    ...stateProps,
    onWillMount: () => retrieveProducts(),
    onLimitChange: val => setLimit(val),
    onPageChange: val => setPage(val)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
);
