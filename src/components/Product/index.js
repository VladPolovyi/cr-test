import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 20px;
  background-color: var(--color-white);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 8px 0px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 3px 3px -2px;
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  color: var(--color-black);
  word-break: break-all;
  max-width: 412px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: 18px;
`;
const Description = styled.p`
  font-size: 13px;
`;

const Price = styled.p`
  font-size: 13px;
`;

const Discount = styled.p`
  font-size: 20px;
`;

const DaysLeft = styled.p`
  font-size: 20px;
`;

const Product = ({ product }) => {
  let discount;

  if (product.discount) {
    discount = (
      <>
        <Discount>{product.discount}% OFF</Discount>
        <DaysLeft>{product.endDate}</DaysLeft>
      </>
    );
  } else {
    discount = null;
  }

  return (
    <Wrapper>
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>${product.price}</Price>
      {discount}
    </Wrapper>
  );
};

export default Product;
