import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundWrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const NotFoundContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  > h2 {
    font-family: cabin, sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
    color: #000;
    margin-top: 0;
    margin-bottom: 25px;
  }

  > div {
    position: relative;
    height: 240px;
  }
`;

const Title = styled.h1`
  font-family: cabin, sans-serif;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  color: #262626;
  margin: 0;
  letter-spacing: 3px;
  padding-left: 6px;
`;

const Numbers = styled.div`
  font-family: montserrat, sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 252px;
  font-weight: 900;
  margin: 0;
  color: #262626;
  text-transform: uppercase;
  letter-spacing: -40px;
  margin-left: -40px;

  & span {
    text-shadow: -8px 0 0 #fff;
  }
`;

const Button = styled.button`
  display: inline-block;
  outline: none;
  border: none;
  border-radius: 0.2rem;
  box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  background-color: #2185d0;
  color: #fff;
  margin: 0 auto;
  padding: 0.7rem 1.5rem;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;

  :hover {
    background-color: #1b74b7;
  }
`;

const NotFound: React.FC = props => (
  <NotFoundWrapper>
    <NotFoundContainer>
      <div>
        <Title>Oops! Page not found</Title>
        <Numbers>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </Numbers>
      </div>
      <h2>We are sorry, but the page you requested was not found</h2>
      <Link to="/">
        <Button>go to homepage</Button>
      </Link>
    </NotFoundContainer>
  </NotFoundWrapper>
);

export default NotFound;
