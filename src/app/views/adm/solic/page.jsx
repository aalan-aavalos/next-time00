"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function SolicitudPage() {
  const [solicData, setSolicData] = useState({
    fechaI: "",
    fechaF: "",
    motivo: "",
    estado: "",
    eCorreo: "",
    tipo: "",
  });
  // Traer solicitudes del backend
  useEffect(() => {
    const loadSolic = async () => {
      try {
        const respuesta = await fetch("/api/solicitud");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        setSolicData(datosJson);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadSolic();
  }, []);

  // Definimos nuestras columnas
  const columns = [
    { field: "eCorreo", headerName: "Correo", width: 250 },
    { field: "motivo", headerName: "Motivo", width: 250 },
    { field: "tipo", headerName: "Tipo", width: 250 },
  ];

  return (
    <div>
      {/** Tabla de datos */}
      <div style={{ width: "100%" }}>
        <div style={{ height: "60vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={solicData}
            columns={columns}
            disableColumnSelector
            disableDensitySelector
            //filterModel={filterModel}
            //onFilterModelChange={setFilterModel}
            hideFooter
            //slots={{ toolbar: GridToolbar }}
            //slotProps={{ toolbar: { showQuickFilter: true } }}
            //onRowClick={handleRowClick}
          />
        </div>
      </div>
      {/* {solicData.map((solicitud) => (
        <h1 key={solicitud._id}>{solicitud.eCorreo}</h1>
      ))} */}
    </div>
  );
}

export default SolicitudPage;
