"use client";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploader = ({ onDataLoad }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Si deseas leer el contenido del archivo y pasarlo a una función
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target.result);
      onDataLoad(jsonData);
    };
    reader.readAsText(selectedFile);
  };

  console.log(file);

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Subir archivo
        <VisuallyHiddenInput
          type="file"
          accept=".json"
          onChange={handleFileChange}
        />
      </Button>
      {/* <input type="file" accept=".json" onChange={handleFileChange} /> */}
    </div>
  );
};

export default FileUploader;