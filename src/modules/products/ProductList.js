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
      <Wrapper>
        <Header>
          <div>
            <Title>All Products</Title>
            <Info>24 Products</Info>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <PageLimit value={limit} onChange={onLimitChange} />
          </div>
        </Header>
        <List>
          {data.map(product => (
            <Item key={product.id}>
              <ItemWrapper>
                <ItemMedia>
                  <Img src={product.product_image} alt="Product" />
                </ItemMedia>
                <ItemInfo>
                  <b style={{ color: '#666' }}>{product.product_name}</b>
                  <br />
                  {product.description}
                  <br />
                  <b>{product.price}</b>
                </ItemInfo>
              </ItemWrapper>
            </Item>
          ))}
        </List>
        <Footer>
          <Pager
            total={total}
            limit={limit}
            value={page}
            onChange={onPageChange}
          />
        </Footer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

const Header = styled.div`
  align-items: flex-end;
  border-bottom: solid 1px #eaeaea;
  display: flex;
  padding: 5px 6px;
  margin: 0 0 15px;
`;
const Title = styled.h1`
  color: #666;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 5px;
`;
const Info = styled.div`
  color: #999;
  font-size: 13px;
`;
const List = styled.ul`
  margin: 0 -10px 0 0;
  padding: 0;
  list-style-type: none;
  &:after {
    content: '';
    clear: both;
    display: block;
  }
`;
const Item = styled.li`
  display: inline-block;
  width: 25%;
`;
const ItemWrapper = styled.div`
  background: #fff;
  border: solid 1px #eaeaea;
  margin: 0 10px 10px 0;
  height: 280px;
`;
const ItemMedia = styled.div`
  padding: 12px 15px 8px;
  text-align: center;
`;
const ItemInfo = styled.div`
  border-top: solid 1px #f2f2f2;
  font-size: 13px;
  line-height: 1.4;
  padding: 10px 15px;
  text-align: left;
  // TODO
  white-space: nowrap;
  overflow: hidden;
  width: 90%;
  text-overflow: ellipsis;
`;
const Img = styled.img`
  display: inline-block;
  width: 180px;
  height: 180px;
  object-fit: contain;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;
export default connectStore(ProductList);
