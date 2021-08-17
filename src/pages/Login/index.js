import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import Input from "../../components/UI/Forms/Input";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Message from "../../components/UI/Forms/Message";
import { FormStyled, Heading, FormWrapper } from "../../components/UI/Elements";
import Button from "../../components/UI/Forms/Button";

const LoginYup = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("The email is required"),
  password: Yup.string()
    .required("The password is required")
    .min(8, "Password requires at least 8 characters"),
});



const ContainerStyled = styled(Container)`
  padding: 100px;
  height: 100%;
`;

const Login = ({ login, error, loading, clean }) => {
  useEffect(() => {
    return () => {
      clean();
    };
  }, [clean]);

  return (
    <ContainerStyled>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginYup}
        onSubmit={async (values, { setSubmitting }) => {
          await login(values);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <FormStyled>
              <Heading>Login</Heading>
              <Field
                type="email"
                name="email"
                placeholder="Your email..."
                component={Input}
              />
              <Field
                type="password"
                name="password"
                placeholder="Your password..."
                component={Input}
              />
              <Button
                type="submit"
                loading={loading ? "Logging in ..." : null}
                disabled={!isValid || isSubmitting}
              >
                Login
              </Button>

              <Message error show={error}>
                {error}
              </Message>
            </FormStyled>
          </FormWrapper>
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
  login: actions.signIn,
  clean: actions.cleanUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
