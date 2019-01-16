import React from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

export default ({ total, limit, page, onChange }) => {
  return (
    <Wrapper>
      <Pagination
        activePage={page}
        hideFirstLastPages
        itemsCountPerPage={limit}
        totalItemsCount={total}
        pageRangeDisplayed={3}
        prevPageText="< Previous page"
        nextPageText="Next page >"
        onChange={onChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  .pagination {
    font-size: 13px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    a {
      color: #666;
      font-weight: 500;
      text-decoration: none;
    }
    li {
      border-bottom: 3px solid transparent;
      display: inline-block;
      padding: 5px 10px;
      &.disabled a {
        color: #ccc;
      }
      &.active {
        background: #fff;
        border-bottom: 3px solid #333;
      }
    }
  }
`;
