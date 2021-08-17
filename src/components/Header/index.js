import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Navigation from "../Navigation";
import Logo from "../Logo";

const HeaderWrapper = styled.header`
  background-color: var(--color-dark);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  color: var(--color-white);
`;

const Header = ({ loggedIn }) => {
  return (
    <HeaderWrapper>
      <Container>
        <Inner>
          <Logo />
          <Navigation loggedIn={loggedIn} />
        </Inner>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
