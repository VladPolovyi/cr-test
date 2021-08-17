import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem/NavItem";

const Nav = styled.nav`
  display: flex;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: "row";
  align-items: center;
  height: 100%;
  margin-bottom: 0;
`;

const Navigation = ({ loggedIn }) => {
  let links;

  if (loggedIn.uid) {
    links = (
      <Ul>
        <NavItem link="/">Home</NavItem>
        <NavItem link="/logout">Logout</NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul>
        <NavItem link="/">Home</NavItem>
        <NavItem link="/register">Register</NavItem>
        <NavItem link="/login">Login</NavItem>
      </Ul>
    );
  }

  return <Nav>{links}</Nav>;
};

export default Navigation;
