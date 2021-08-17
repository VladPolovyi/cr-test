import React from "react";
import styled from "styled-components";

const P = styled.p`
  margin-top: 10px;
  text-align: center;
  color: ${({ error, success }) => {
    if (error) return "var(--color-red)";
    if (success) return "var(--color-green)";
    else return "inherit";
  }};
  opacity: ${({ show }) => (show ? "1" : "0")};
`;

const Message = ({ children, error, success, show }) => {
  return (
    <P error={error} success={success} show={show}>
      {children}
    </P>
  );
};

export default Message;
