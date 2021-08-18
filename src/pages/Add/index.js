import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/UI/Forms/Button";
import Message from "../../components/UI/Forms/Message";
import Input from "../../components/UI/Forms/Input";
import Textarea from "../../components/UI/Forms/Textarea";
import ImageInput from "../../components/UI/Forms/ImageInput";

import {
  FormStyled,
  Heading,
  FormWrapper,
  Section,
} from "../../components/UI/Elements";

const ProductYup = Yup.object().shape({
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

const AddProduct = ({ addProduct, error, loading, clean, success }) => {
  useEffect(() => {
    return () => {
      clean();
    };
  }, [clean]);

  return (
    <Section>
      <Container>
        <Row>
          <Col>
            <Heading>ADD A NEW PRODUCT</Heading>
            <Formik
              initialValues={{
                title: "",
                description: "",
                price: "",
                discount: "",
                endDate: "",
                productImage: undefined,
              }}
              validationSchema={ProductYup}
              onSubmit={async (
                values,
                { setSubmitting, resetForm, setStatus }
              ) => {
                await addProduct(values);
                resetForm({});
                setStatus({ success: true });

                setSubmitting(false);
              }}
            >
              {({
                isSubmitting,
                isValid,
                setFieldValue,
                errors,
                touched,
                handleBlur,
                status,
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

                    <Field
                      name="productImage"
                      type="file"
                      accept="image/*"
                      value={undefined}
                      status={status}
                      component={ImageInput}
                    />

                    <Button
                      type="submit"
                      loading={loading ? "Adding..." : null}
                      disabled={!isValid || isSubmitting || loading}
                    >
                      Add product
                    </Button>

                    <Message error show={error}>
                      {error}
                    </Message>
                    <Message success show={error === false && success === true}>
                      Product successfully added!!!
                    </Message>
                  </FormStyled>
                </FormWrapper>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

const mapStateToProps = ({ products }) => ({
  loading: products.loading,
  error: products.error,
  success: products.success,
});

const mapDispatchToProps = {
  addProduct: actions.addProduct,
  clean: actions.addCleanUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
