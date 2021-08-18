import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Section, Heading, Button } from "../../components/UI/Elements";
import Product from "../../components/Product";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

const ResultWrapper = styled.div`
  padding: 20px 0;
  font-size: 20px;
  text-align: center;
`;

const ListWrapper = styled.div`
  padding: 20px 0;
  font-size: 20px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Home = ({ products, requesting, requested, loggedIn }) => {
  let result;

  if (products === undefined) {
    result = (
      <ResultWrapper>
        <p>Loading...</p>
      </ResultWrapper>
    );
  } else if (requested && products === null) {
    result = (
      <ResultWrapper>
        <p>No products has been added yet</p>
      </ResultWrapper>
    );
  } else {
    // when products fetched
    let arrayResult = dictionaryToArray(products);
    // sort products in desc order
    arrayResult.sort((a, b) => (a.date > b.date ? -1 : 1));

    result = (
      <ListWrapper>
        {arrayResult.map((e) => (
          <Product key={e.key} product={e} loggedIn={loggedIn} />
        ))}
      </ListWrapper>
    );
  }

  let addNew;

  if (loggedIn) {
    addNew = <Button to="/add">Add new product</Button>;
  }

  return (
    <Section>
      <Container>
        <Heading>PRODUCTS</Heading>
        {addNew}
        {result}
        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      </Container>
    </Section>
  );
};

const mapStateToProps = ({ firestore, firebase }) => ({
  products: firestore.data.products,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
  loggedIn: firebase.auth.uid,
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => ["products"])
)(Home);

const dictionaryToArray = (dictionary) => {
  let array = [];

  for (const key in dictionary) {
    array.push({ ...dictionary[key], key: key });
  }

  return array;
};
