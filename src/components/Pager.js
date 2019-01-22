import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export function getVisiblePages(page, totalPages, range) {
  const pages = [...Array(totalPages)].map((val, i) => i + 1);
  const isFirstPage = page === 1 || page - Math.floor(range / 2) <= 1;
  const isLastPage = page === totalPages || page + range > totalPages;

  if (isFirstPage) {
    return pages.slice(0, range);
  } else if (isLastPage) {
    return pages.slice(-range);
  } else {
    const i = pages.indexOf(page);
    return pages.slice(i - Math.floor(range / 2), i + Math.ceil(range / 2));
  }
}

export default class Pager extends React.Component {
  static propTypes = {
    limit: PropTypes.number,
    page: PropTypes.number,
    range: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func
  };
  static defaultProps = {
    limit: 8,
    page: 1,
    range: 3,
    total: 0,
    onChange: () => {}
  };
  handlePageClick = nextPage => e => {
    const { limit, onChange, page, total } = this.props;
    const totalPages = Math.ceil(total / limit);

    e.preventDefault();

    if (nextPage === page || nextPage < 1 || nextPage > totalPages) {
      return;
    }

    onChange(nextPage);
  };
  render() {
    const { total, limit, page, range, ...otherProps } = this.props;

    if (!total) {
      return null;
    }

    const totalPages = Math.ceil(total / limit);
    const visiblePages = getVisiblePages(page, totalPages, range);
    return (
      <Wrapper {...otherProps}>
        <Item disabled={page === 1}>
          <Link href="#" onClick={this.handlePageClick(page - 1)}>
            &lt; Previous page
          </Link>
        </Item>
        {visiblePages.map(i => (
          <Item key={i} active={i === page}>
            <Link href="#" onClick={this.handlePageClick(i)}>
              {i}
            </Link>
          </Item>
        ))}
        <Item disabled={page === totalPages}>
          <Link href="#" onClick={this.handlePageClick(page + 1)}>
            Next page &gt;
          </Link>
        </Item>
      </Wrapper>
    );
  }
}

const Wrapper = styled.ul`
  display: inline-block;
  font-size: 13px;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const Link = styled.a`
  color: #666;
  display: inline-block;
  font-weight: 500;
  padding: 5px 10px;
  text-decoration: none;
`;
const Item = styled.li`
  border-bottom: 3px solid transparent;
  display: inline-block;
  ${props =>
    props.active &&
    `
      background: #fff;
      border-color: #333;
    `};
  ${Link} {
    ${props =>
      props.disabled &&
      `
        cursor: default;
        color: #ccc;
      `};
  }
`;
