import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Li = styled.li`
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 10px;
  margin: 0 5px;
  color: var(--color-white);
  transition: all 0.2s;
  text-decoration: none;
  &:hover {
    color: var(--color-grey);
  }
  &.active {
    color: var(--color-blue);
  }
`;

const NavItem = ({ link, children }) => {
  return (
    <Li>
      <StyledNavLink exact activeClassName="active" to={link}>
        {children}
      </StyledNavLink>
    </Li>
  );
};

export default NavItem;
