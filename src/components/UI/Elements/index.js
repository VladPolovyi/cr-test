import styled from "styled-components";
import { Form } from "formik";
import { NavLink } from "react-router-dom";

export const FormStyled = styled(Form)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--color-lightBlue);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Heading = styled.h1`
  padding: 20px 0;
  font-weight: 700;
  font-size: 25px;
  text-align: center;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background-color: var(--color-lightBlue);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Section = styled.section`
  padding: 40px 0;
`;

export const Button = styled(NavLink)`
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin: 0 auto 30px auto;
  text-align: center;
  text-decoration: none;
  background-color: var(--color-lightBlue);
  color: var(--color-white);

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue);
  }
`;
