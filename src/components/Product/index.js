import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-white);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 8px 0px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 3px 3px -2px;
  border-radius: 0.5rem;
  color: var(--color-black);
  word-break: break-all;
  max-width: 412px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 20px;
`;
const Description = styled.p`
  font-size: 16px;
  min-height: 50px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const DiscountWrapper = styled.div`
  display: flex;
  padding: 10px 10px 0 10px;
  min-height: 35px;
  position: absolute;
  left: 0;
  bottom: 10px;
`;

const Discount = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 10px;
  margin-right: 10px;
  border-radius: 2px;

  background: var(--color-green);
  text-align: center;
  line-height: 1.2;
  color: var(--color-black);
  margin-bottom: 0;
`;

const DaysLeft = styled(Discount)`
  background: var(--color-orange);
`;

const ImageWrapper = styled.div`
  display: flex;
  height: 300px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--color-grey);
  transition: all 0.5s;
  overflow: auto;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;

  p:last-child {
    margin-bottom: 0;
  }
`;

const ManageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px;
  text-align: center;
  text-decoration: none;
  background-color: var(--color-lightBlue);
  color: var(--color-white);

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue);
  }
`;

const Product = ({ product, loggedIn, deleteProduct }) => {
  console.log(product);

  let discount;

  if (product.discount && product.endDate) {
    let now = formatDate(new Date());
    let end = product.endDate;
    let days = getDays(now, end);

    discount = (
      <>
        <Discount>{product.discount}% off</Discount>
        <DaysLeft>{days} days left</DaysLeft>
      </>
    );
  } else {
    discount = null;
  }

  let manageOptions;
  if (loggedIn) {
    manageOptions = (
      <ManageWrapper>
        <Button>edit</Button>

        <Button onClick={async () => await deleteProduct(product.key)}>
          delete
        </Button>
      </ManageWrapper>
    );
  }

  return (
    <div>
      <Wrapper>
        <ImageWrapper>
          <Image src={product.image} loading="lazy" alt={product.title} />
          <DiscountWrapper>{discount}</DiscountWrapper>
        </ImageWrapper>

        <InfoWrapper>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>${product.price}</Price>
        </InfoWrapper>
      </Wrapper>
      {manageOptions}
    </div>
  );
};

const mapStateToProps = ({ products }) => ({
  error: products.deleteProduct.error,
  loading: products.deleteProduct.loading,
});

const mapDispatchToProps = {
  deleteProduct: actions.deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const getDays = (now, end) => {
  let diffInMs = new Date(end) - new Date(now);
  return diffInMs / (1000 * 60 * 60 * 24);
};

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
