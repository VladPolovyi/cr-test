import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 2px;
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 12px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: var(--color-red);
  font-size: 10px;
  font-weight: 700;
  margin-top: 2px;
`;

const Input = ({ field, form: { errors }, ...props }) => {
  return (
    <FieldWrapper>
      <StyledInput {...field} {...props} />
      <ErrorMessage>{errors[field.name]}</ErrorMessage>
    </FieldWrapper>
  );
};

export default Input;
