import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectStore from './connectStore';
import { Pager, PageLimit } from '../../components';
import styled from 'styled-components';

export class ProductList extends Component {
  static propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
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
    onPagechange: () => {}
  };
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const {
      data,
      limit,
      page,
      total,
      onLimitChange,
      onPageChange
    } = this.props;
    return (
      <div>
        <h1>All Products</h1>
        <PageLimit value={limit} onChange={onLimitChange} />
        <Pager
          total={total}
          limit={limit}
          value={page}
          onChange={onPageChange}
        />
        <List>
          {data.map(product => (
            <Item key={product.id}>
              <Img src={product.product_image} alt="Product" />
              <br />
              {product.product_name}
              <br />
              {product.description}
              <br />${product.price}
            </Item>
          ))}
        </List>
        <PageLimit value={limit} onChange={onLimitChange} />
        <Pager
          total={total}
          limit={limit}
          value={page}
          onChange={onPageChange}
        />
      </div>
    );
  }
}

const List = styled.ul`
  margin: 0;
  list-style-type: none;
  &:after {
    content: '';
    clear: both;
    display: block;
  }
`;
const Item = styled.li`
  float: left;
  width: 300px;
  height: 300px;
  background: #ffc;
  margin: 0 10px 10px 0;
  text-align: center;
`;
const Img = styled.img`
  background: #000;
  display: inline-block;
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

export default connectStore(ProductList);
