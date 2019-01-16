import React from 'react';
import styled from 'styled-components';

export default ({ product_image, product_name, description, price }) => (
  <Item>
    <ItemMedia>
      <Img src={product_image} alt={`Image of ${product_name}`} />
    </ItemMedia>
    <ItemInfo>
      <b style={{ color: '#666' }}>{product_name}</b>
      <br />
      {description}
      <br />
      <b>{price}</b>
    </ItemInfo>
  </Item>
);

const Item = styled.div`
  background: #fff;
  border: solid 1px #eaeaea;
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
