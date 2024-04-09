"use client";

import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";

const MyPage = () => {
  const [jsonData, setJsonData] = useState(null);

  const uploadUsers = async (user) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log("New user created:", data);
  };

  const handleDataLoad = (data) => {
    // Aquí puedes hacer lo que quieras con los datos cargados
    setJsonData(data);
  };
  const handleSubmit = async () => {
    if (jsonData !== null) uploadUsers(jsonData);
  };

  return (
    <div>
      <h1>My Page</h1>
      <FileUploader onDataLoad={handleDataLoad} />
      <button onClick={handleSubmit}>Mandarlos</button>
      {jsonData && (
        <div>
          <h2>Datos cargados: {jsonData.length}</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyPage;
