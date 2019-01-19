import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, GridCell, Pager, PageLimit } from '../../components';
import { ReactComponent as Loader } from '../../svgs/product-list-loader.svg';
import connectStore from './connectStore';
import Item from './Item';

export class ProductList extends Component {
  static propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.oneOf([4, 8, 12, 24, 48, 96, 198]),
    total: PropTypes.number,
    onWillMount: PropTypes.func,
    onLimitChange: PropTypes.func,
    onPageChange: PropTypes.func
  };
  static defaultProps = {
    data: [],
    isLoading: false,
    page: 1,
    limit: 8,
    total: 0,
    onWillMount: () => {},
    onLimitChange: () => {},
    onPageChange: () => {}
  };
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const {
      data,
      isLoading,
      limit,
      page,
      total,
      onLimitChange,
      onPageChange
    } = this.props;

    const isInitLoading = !data.length && isLoading;
    if (isInitLoading) {
      return <Loader />;
    }

    return (
      <div>
        <Header>
          <div>
            <Title>All Products</Title>
            <Info>{total} Products</Info>
          </div>
          <div>
            <PageLimit value={limit} onChange={onLimitChange} />
          </div>
        </Header>
        <Grid>
          {data.map((product, i) => (
            <GridCell key={i}>
              <Item {...product} />
            </GridCell>
          ))}
        </Grid>
        <Footer>
          <Pager
            page={page}
            limit={limit}
            total={total}
            onChange={onPageChange}
          />
        </Footer>
      </div>
    );
  }
}

const Header = styled.div`
  align-items: flex-end;
  border-bottom: solid 1px #eaeaea;
  display: flex;
  padding: 5px 6px;
  margin: 0 0 15px;
  > div:last-child {
    margin-left: auto;
  }
`;
const Title = styled.h1`
  color: #666;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 5px;
`;
const Info = styled.div`
  color: #999;
  font-size: 13px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;
export default connectStore(ProductList);
