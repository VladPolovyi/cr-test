import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import StyledInput from "../../components/UI/Forms/Input";
import StyledButton from "../../components/UI/Forms/Button";
import Message from "../../components/UI/Forms/Message";

import * as actions from "../../store/actions";
import { connect } from "react-redux";

const RegisterYup = Yup.object().shape({
  firstName: Yup.string().required("The first name is required").min(2).max(50),
  lastName: Yup.string().required("The last name is required").min(2).max(50),
  email: Yup.string().email("Invalid email.").required("The email is required"),
  password: Yup.string()
    .required("The password is required")
    .min(8, "Password requires at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("Please confirm your password."),
});

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background-color: var(--color-lightBlue);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--color-lightBlue);
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 700;
  }
`;

const ContainerStyled = styled(Container)`
  padding: 100px;
  height: 100%;
`;

const Register = ({ signUp, loading, error, clean }) => {
  useEffect(() => {
    return () => {
      clean();
    };
  }, [clean]);

  return (
    <ContainerStyled>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterYup}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await signUp(values);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Wrapper>
            <FormStyled>
              <h1>Register</h1>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                component={StyledInput}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                component={StyledInput}
              />
              <Field
                type="email"
                name="email"
                placeholder="Your email..."
                component={StyledInput}
              />
              <Field
                type="password"
                name="password"
                placeholder="Your password..."
                component={StyledInput}
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password..."
                component={StyledInput}
              />
              <StyledButton
                type="submit"
                loading={loading ? "Signing up ..." : null}
                disabled={!isValid || isSubmitting}
              >
                Submit
              </StyledButton>

              <Message error show={error}>
                {error}
              </Message>
            </FormStyled>
          </Wrapper>
        )}
      </Formik>
    </ContainerStyled>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
  clean: actions.cleanUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
