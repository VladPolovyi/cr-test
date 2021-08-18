import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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

const ImageInput = ({
  field,
  firebaseImage,
  form: { errors, setFieldValue, status },
  ...props
}) => {
  const [name, setName] = useState();
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 100, height: 100 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      let file = e.target.files[0];
      setName(file.name);
      reader.addEventListener("load", () => {
        setUpImg(reader.result);
      });
      reader.readAsDataURL(file);
      setFieldValue("productImage", file);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    generateDownload(
      previewCanvasRef.current,
      completedCrop,
      setFieldValue,
      name
    );
  }, [completedCrop]);

  useEffect(() => {
    if (status && status.success === true && field.value === undefined) {
      console.log("reset CANVAS");

      setName(null);
      setUpImg(null);
      setUpImg(null);
      setCompletedCrop(null);
    }
  }, [status]);

  useEffect(() => {
    if (firebaseImage !== undefined && firebaseImage !== null) {
      console.log("firebaseImage");
      console.log({ firebaseImage });
      const reader = new FileReader();
      let file = firebaseImage;

      setName(firebaseImage.name);
      reader.addEventListener("load", () => {
        setUpImg(reader.result);
      });
      reader.readAsDataURL(file);
      setFieldValue("productImage", firebaseImage);
    }
  }, [firebaseImage]);

  return (
    <div>
      <StyledInput
        id="video-upload"
        {...field}
        {...props}
        onChange={onSelectFile}
      />

      <LabelForInput htmlFor="video-upload">
        <UploadButton>Upload</UploadButton>
      </LabelForInput>
      {field.value ? field.value.name : ""}
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>

      <ErrorMessage>{errors[field.name]}</ErrorMessage>
    </div>
  );
};

export default ImageInput;

function generateDownload(canvas, crop, setFieldValue, name) {
  if (!crop || !canvas) {
    return;
  }
  let newName = new Date().valueOf() + name;

  canvas.toBlob(
    (blob) => {
      if (blob === null) return;

      blob.name = newName;
      blob.lastModifiedDate = new Date();

      setFieldValue("productImage", blob);
    },
    "image/jpeg",
    1
  );
}
