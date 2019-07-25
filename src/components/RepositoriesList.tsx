import React from "react";
import styled from "styled-components";
import { FollowersIcon, StarIcon } from "./icons";
import { LazyImage } from "react-lazy-images";
import { IRepositoryItem } from "../redux/github/types";

const List = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ListItem = styled.li`
  display: flex;
  flex: 0 0 100%;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-sizing: border-box;
  padding: 1rem;
  margin: 0 2.5px 10px 2.5px;
  justify-content: space-between;

  .avatar {
    flex: 0 0 25%;
    margin-right: 30px;
  }

  .avatar__image {
    border-radius: 50%;
    width: 100%;
  }

  .avatar__thumb {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #797979;
    border-radius: 50%;

    ::before {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 0 0 70%;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .lang,
  .description {
    margin-bottom: 15px;
    text-align: left;
  }

  .stats {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
  }

  .stars,
  .followers {
    display: flex;
    align-items: center;

    span {
      margin-left: 3px;
    }
  }

  .stars {
    margin-right: 30px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 600px) {
    .avatar {
      flex: 0 0 30%;
    }

    .body {
      flex: 0 0 65%;
    }
  }
`;

interface IProps {
  repositories: IRepositoryItem[] | null;
}

class RepositoriesList extends React.PureComponent<IProps> {
  render() {
    const { repositories } = this.props;

    return (
      <List>
        {repositories &&
          repositories.map(item => (
            <ListItem key={item.id}>
              <div className="avatar">
                <a href={item.owner.html_url} title="owner link">
                  <LazyImage
                    src={item.owner.avatar_url}
                    alt="owner avatar"
                    placeholder={({ ref }) => (
                      <div className="avatar__thumb" ref={ref} />
                    )}
                    actual={({ imageProps }) => (
                      <img
                        {...imageProps}
                        className="avatar__image"
                        alt="owner avatar"
                      />
                    )}
                  />
                  <span className="avatar__owner">{item.owner.login}</span>
                </a>
              </div>
              <div className="body">
                <div className="title">
                  <a href={item.html_url} title="repository link">
                    {item.name}
                  </a>
                </div>
                <div className="description">
                  {item.description && item.description.length > 200
                    ? `${item.description.slice(0, 200)}...`
                    : item.description}
                </div>
                <div className="lang">
                  {item.language &&
                    item.language.length > 0 &&
                    `Language: ${item.language}`}
                </div>
                <div className="stats">
                  <div className="stars">
                    <StarIcon /> <span>{item.stargazers_count}</span>
                  </div>
                  <div className="followers">
                    <FollowersIcon /> <span>{item.watchers_count}</span>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
      </List>
    );
  }
}

export default RepositoriesList;
