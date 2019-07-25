import React from "react";
import styled from "styled-components";
import PaginationList from "react-js-pagination";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 16px 0;

  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 6px 12px;
      text-decoration: none;
      color: #337ab7;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;
      cursor: pointer;
    }

    li:hover {
      color: #23527c;
      background-color: #eee;
      border-color: #ddd;
    }

    .active,
    .active:hover {
      color: #fff;
      background-color: #337ab7;
      border-color: #337ab7;
      cursor: default;
    }

    .disabled,
    .disabled:hover {
      color: #777;
      background-color: #fff;
      border-color: #ddd;
      cursor: not-allowed;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: inherit;
  }

  .perPage {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    &__select {
      height: 100%;
      margin-left: 5px;
    }
  }

  @media (max-width: 500px) {
    justify-content: space-between;
    flex-wrap: wrap;

    .perPage {
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
    }
  }
`;

interface IPaginationProps {
  activePage: number;
  perPage: number;
  total_count: number;
  handlePagination: (page: number) => void;
  handleSelect: (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => void;
}

export class Pagination extends React.PureComponent<IPaginationProps> {
  render() {
    const {
      activePage = 1,
      perPage = 15,
      total_count,
      handlePagination,
      handleSelect
    } = this.props;

    return (
      <PaginationWrapper>
        <PaginationList
          activePage={activePage}
          itemsCountPerPage={perPage}
          totalItemsCount={total_count}
          pageRangeDisplayed={5}
          onChange={handlePagination}
        />
        <div className="perPage">
          <span>Per page:</span>
          <select
            name="perPage"
            className="perPage__select"
            onChange={handleSelect}
            value={perPage}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </PaginationWrapper>
    );
  }
}

export default Pagination;
