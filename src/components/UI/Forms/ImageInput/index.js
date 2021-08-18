import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: var(--color-red);
  font-size: 10px;
  font-weight: 700;
  margin-top: 2px;
`;

const UploadButton = styled.div`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 0 auto 30px auto;
  text-align: center;
  text-decoration: none;
  background-color: var(--color-sky);
  color: var(--color-white);

  &:hover {
    color: var(--color-white);
    background-color: var(--color-sky);
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const LabelForInput = styled.label`
  width: 100%;
`;

const ImageInput = ({ field, form: { errors, setFieldValue }, ...props }) => {
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      setFieldValue("productImage", file);
    }
  };

  return (
    <div>
      <StyledInput
        id="video-upload"
        {...field}
        {...props}
        onChange={(e) => handleImageChange(e)}
      />

      <LabelForInput htmlFor="video-upload">
        <UploadButton>Upload</UploadButton>
      </LabelForInput>

      {field.value ? field.value.name : ""}

      <ErrorMessage>{errors[field.name]}</ErrorMessage>
    </div>
  );
};

export default ImageInput;




