import React, { Component } from 'react';
import Img from 'react-image';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as IconOffline } from '../../svgs/cloud-offline.svg';
import { ReactComponent as IconSpinner } from '../../svgs/spinner.svg';

const Icon = ({ spin, IconComponent }) => {
  return (
    <Indicator spin={spin}>
      <IconComponent viewBox="-200 -200 500 500" />
    </Indicator>
  );
};

export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const {
      data: { product_image, product_name, description, price }
    } = this.props;
    return (
      <Wrapper>
        <Media>
          <Img
            src={product_image}
            alt={`Image of ${product_name}`}
            loader={<Icon IconComponent={IconSpinner} spin />}
            unloader={<Icon IconComponent={IconOffline} />}
          />
        </Media>
        <Text>
          <Name as="h2">{product_name}</Name>
          <Desc as="p">{description}</Desc>
          <Price>{price}</Price>
        </Text>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #fff;
  border: solid 1px #eaeaea;
  height: 280px;
`;
const Media = styled.div`
  padding: 12px 15px 8px;
  text-align: center;
  img {
    display: inline-block;
    width: 180px;
    height: 180px;
    object-fit: contain;
  }
`;
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Indicator = styled.span`
  display: inline-flex;
  align-items: center;
  width: 180px;
  height: 180px;
  svg {
    animation: ${props =>
      props.spin
        ? css`
            ${spin} 2s linear infinite
          `
        : 'none'};
    fill: #ccc;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    width: 180px;
    height: 180px;
  }
`;
const Text = styled.div`
  border-top: solid 1px #f2f2f2;
  font-size: 13px;
  line-height: 1.4;
  padding: 10px 15px;
  text-align: left;
`;
const Truncate = styled.div`
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
`;
const Name = styled(Truncate)`
  color: #666;
  font-size: 13px;
  font-weight: bold;
  margin: 0;
`;
const Desc = styled(Truncate)`
  margin: 0;
`;
const Price = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;
