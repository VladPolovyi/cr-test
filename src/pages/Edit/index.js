import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/UI/Forms/Button";
import Message from "../../components/UI/Forms/Message";
import Input from "../../components/UI/Forms/Input";
import Textarea from "../../components/UI/Forms/Textarea";
import ImageInput from "../../components/UI/Forms/ImageInput";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  FormStyled,
  Heading,
  FormWrapper,
  Section,
} from "../../components/UI/Elements";

const ProductEditYup = Yup.object().shape({
  title: Yup.string()
    .required("The title is required")
    .min(20, "Title requires at least 20 characters")
    .max(60, "Max length of title is 60 characters"),
  description: Yup.string().max(
    200,
    "Max length of description is 200 characters"
  ),
  price: Yup.number().max(99999999.99).required().positive(),
  discount: Yup.number().min(10).max(90).positive().integer(),
  endDate: Yup.date().when("discount", {
    is: (discount) => discount > 0,
    then: Yup.date()
      .required("You need to set discount end date.")
      .min(new Date() + 1, "Date must be later by 1 day"),
  }),
  productImage: Yup.mixed()
    .required("Product Image is required")
    .test(
      "dementions",
      "Image must have width and height min - 200px and max - 4000px",
      (value) => {
        return new Promise((resolve) => {
          if (value !== undefined) {
            const img = new Image();
            img.src = URL.createObjectURL(value);
            return img.decode().then(() => {
              URL.revokeObjectURL(img.src);
              console.log(img.width);
              console.log(img.height);
              if (
                img.width < 200 ||
                img.height < 200 ||
                img.height > 4000 ||
                img.width > 4000
              ) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
          } else {
            resolve(false);
          }
        });
      }
    ),
});

const StyledNavLink = styled(NavLink)`
  color: var(--color-blue);
  &:hover {
    color: var(--color-blue);
  }
`;

const ResultWrapper = styled.div`
  padding: 20px 0;
  font-size: 20px;
  text-align: center;
`;

const EditProduct = ({
  error,
  loading,
  clean,
  success,
  products,
  requested,
  editProduct,
}) => {
  useEffect(() => {
    return () => {
      clean();
    };
  }, [clean]);

  let content;

  let params = useParams();

  if (products === undefined) {
    content = (
      <ResultWrapper>
        <p>Loading...</p>
      </ResultWrapper>
    );
  } else if (requested.products && products === null) {
    content = (
      <ResultWrapper>
        <p>No products has been added yet</p>
      </ResultWrapper>
    );
  } else if (products[params.id] === undefined) {
    content = (
      <ResultWrapper>
        <p>
          This product has been deleted, go back to{" "}
          <StyledNavLink exact to="/">
            Products
          </StyledNavLink>
        </p>
      </ResultWrapper>
    );
  } else {
    content = (
      <Row>
        <Col>
          <Heading>EDIT PRODUCT</Heading>
          <Formik
            initialValues={{
              title: products[params.id].title,
              description: products[params.id].description,
              price: products[params.id].price,
              discount: products[params.id].discount,
              endDate: products[params.id].endDate,
              //   productImage: '',
            }}
            validationSchema={ProductEditYup}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              editProduct(params.id, values);
              setSubmitting(false);
              // resetForm();
            }}
          >
            {({
              isSubmitting,
              isValid,
              setFieldValue,
              errors,
              touched,
              handleBlur,
            }) => (
              <FormWrapper>
                <FormStyled>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title..."
                    component={Input}
                  />

                  <Field
                    type="text"
                    name="description"
                    placeholder="Description..."
                    component={Textarea}
                  />
                  <Field
                    type="number"
                    name="price"
                    placeholder="price..."
                    component={Input}
                  />
                  <Field
                    type="number"
                    name="discount"
                    placeholder="Discount..."
                    component={Input}
                  />

                  <Field
                    type="date"
                    name="endDate"
                    placeholder="Discount end date..."
                    component={Input}
                  />

                  {/* <Field
                    name="productImage"
                    type="file"
                    accept="image/*"
                    value={undefined}
                    component={ImageInput}
                  /> */}

                  <Button
                    type="submit"
                    loading={loading ? "Editing..." : null}
                    disabled={!isValid || isSubmitting}
                  >
                    Edit product
                  </Button>

                  <Message error show={error}>
                    {error}
                  </Message>
                  <Message success show={error === false && success === true}>
                    Product successfully edited
                  </Message>
                </FormStyled>
              </FormWrapper>
            )}
          </Formik>
        </Col>
      </Row>
    );
  }

  return (
    <Section>
      <Container>{content}</Container>
    </Section>
  );
};

const mapStateToProps = ({ products, firestore }) => ({
  products: firestore.data.products,
  requested: firestore.status.requested,
  loading: products.loading,
  error: products.editProduct.error,
  success: products.editProduct.success,
});

const mapDispatchToProps = {
  editProduct: actions.editProduct,
  clean: actions.editCleanUp,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => ["products"])
)(EditProduct);
