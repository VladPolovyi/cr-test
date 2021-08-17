import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 5px;
  background-color: var(--color-lightBlue);
  color: var(--color-white);
  height: 2rem;
`;

const Footer = () => {
  return <Wrapper>©{new Date().getFullYear()}</Wrapper>;
};

export default Footer;
