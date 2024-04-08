"use client";
import { useState } from 'react';
import axios from 'axios';

function UserUploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/cargaM', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Usuarios insertados exitosamente');
    } catch (error) {
      setMessage('Error al insertar usuarios');
      console.error('Error inserting users:', error);
    }
  };

  return (
    <div>
      <h2>Subir archivo JSON de usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button type="submit">Subir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserUploadForm;
