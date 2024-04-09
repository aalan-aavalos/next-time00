"use client";

// components/FileUploader.js

import React, { useState } from "react";

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
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;

// db.actividades.aggregate([
//   {
//     $unwind: "$Administradores",
//   },
//   {
//     $unwind: "$Empleados",
//   },
// ])
