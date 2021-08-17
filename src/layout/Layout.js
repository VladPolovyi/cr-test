import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { connect } from "react-redux";

const Main = styled.main`
  width: 100%;
  margin-top: 4rem;
  min-height: calc(100vh - 6rem);
`;

const Layout = ({ children, loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Layout);
