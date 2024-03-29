import React from 'react';
import { ReactComponent as IconCaret } from '../svgs/caret-down.svg';
import styled from 'styled-components';

export default ({ onChange, value, ...otherProps }) => {
  const sizes = [4, 8, 12, 24, 48, 96, 198];
  return (
    <Wrapper>
      <Select
        value={value}
        onChange={e => onChange(parseInt(e.target.value, 10))}
        {...otherProps}>
        {sizes.map((size, i) => (
          <option key={i} value={size}>
            {size} per page
          </option>
        ))}
      </Select>
      <Icon />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;
const Icon = styled(IconCaret).attrs({ viewBox: '6 6 12 12' })`
  height: 13px;
  position: absolute;
  right: 0;
  top: calc(50% - 13px / 2);
  z-index: 0;
  width: 13px;
`;
const Select = styled.select`
  appearance: none;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  padding-right: 15px;
  position: relative;
  z-index: 1;
  outline: 0;
  &:after {
    content: '&#9662;';
  }
`;
