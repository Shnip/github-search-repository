import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import debounce from "lodash.debounce";
import {
  getRepositories,
  clearRepositories,
  clearErrors
} from "../redux/github/actions";
import {
  IGithubAction,
  IGithubRepository,
  IError
} from "../redux/github/types";
import { rootState } from "../redux/rootReducer";
import RepositoresList from "./RepositoriesList";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.7rem 0.6rem 0.7rem 0;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 0;
  padding: 0 1rem;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  border: none;
  font-size: 1.2rem;
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  fill: #909090;
`;

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"
    />
  </svg>
);

export interface IGithubState {
  search: string;
  activePage: number;
  perPage: number;
}

interface IProps {
  repositories: IGithubRepository;
  errors: IError;
  getRepositories: (search: IGithubState) => IGithubAction;
  clearRepositories: () => IGithubAction;
  clearErrors: () => IGithubAction;
}

class Github extends React.Component<IProps> {
  state: IGithubState = {
    search: "",
    activePage: 1,
    perPage: 15
  };

  componentDidUpdate(prevProps: IProps, prevState: IGithubState) {
    if (!prevProps.errors && this.props.errors) {
      toast.error(this.props.errors.message);
      this.props.clearErrors();
      this.setState({ activePage: 1 }, this.fetchRepositories);
    }
  }

  fetchRepositories = (): void => {
    const { search, activePage, perPage } = this.state;

    if (search.length < 3) {
      if (this.props.repositories.items) {
        this.props.clearRepositories();
      }
      return;
    }

    this.props.getRepositories({ search, activePage, perPage });
  };

  debouncedFetchRepositories = debounce(this.fetchRepositories, 2000);

  onChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.currentTarget;
    if (name === "search") {
      this.setState({ [name]: value }, this.debouncedFetchRepositories);
    } else {
      this.setState({ [name]: value }, this.fetchRepositories);
    }
  };

  handlePagination = (page: number) => {
    this.setState({ activePage: page }, this.fetchRepositories);
  };

  render() {
    const { items, total_count } = this.props.repositories;
    const { perPage, activePage } = this.state;
    return (
      <>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar
          pauseOnHover
        />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Title>Github search</Title>
            <div className="row center-xs">
              <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
                <SearchInput>
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search repositories"
                    onChange={this.onChange}
                    value={this.state.search}
                  />
                  <IconWrapper>
                    <SearchIcon />
                  </IconWrapper>
                </SearchInput>

                {items ? (
                  items.length > 0 ? (
                    <>
                      <Pagination
                        activePage={activePage}
                        perPage={perPage}
                        total_count={total_count}
                        handlePagination={this.handlePagination}
                        handleSelect={this.onChange}
                      />
                      <RepositoresList repositories={items} />
                    </>
                  ) : (
                    <div>We cannot find any repository with this name.</div>
                  )
                ) : (
                  <div>Type something to search repositories</div>
                )}

                <Pagination
                  activePage={activePage}
                  perPage={perPage}
                  total_count={total_count}
                  handlePagination={this.handlePagination}
                  handleSelect={this.onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

interface reduxProps {
  repositories: IGithubRepository;
  errors: IError;
}

const mapDispatchToProps = (state: rootState): reduxProps => ({
  repositories: state.github.repositories,
  errors: state.github.errors
});

export default connect(
  mapDispatchToProps,
  { getRepositories, clearRepositories, clearErrors }
)(Github);
