import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 5px 5px;

  &:disabled {
    background-color: var(--color-grey);
  }
`;

const Button = ({ children, disabled, loading, ...rest }) => {
  return (
    <StyledButton disabled={disabled} {...rest}>
      {loading ? loading : children}
    </StyledButton>
  );
};

export default Button;
