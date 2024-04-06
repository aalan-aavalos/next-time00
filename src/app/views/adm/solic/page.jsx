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
  const solictudModel = {
    fechaI: "",
    fechaF: "",
    motivo: "",
    estado: "",
    eCorreo: "",
    tipo: "",
  };

  const [estadoFilter, setEstadoFilter] = useState("Pendiente");
  const [tipoFilter, setTipoFilter] = useState("");
  const [solicData, setSolicData] = useState([]);
  const [selectId, setSelectId] = useState(null);
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

  const updateSolic = async (solicId, solicData) => {
    const response = await fetch(`/api/usrs/${solicId}`, {
      method: "PUT",
      body: JSON.stringify(solicData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedUsers = solicData.map((solic) =>
        solic._id === solicId ? { ...solic, ...solicData } : solic
      );
      setSolicData(updatedUsers);
      setSelectId(null);
      setUpdateMode(false);
    }
  };

  // Constrolar el estado del filtro
  const handleEstadoFilterChange = (event) => {
    setEstadoFilter(event.target.value);
  };

  // Controlar el tipo del filtro
  const handleTipoFilterChange = (event) => {
    setTipoFilter(event.target.value);
  };

  // Obtener el la fila seleccionada de la tabla
  const handleRowClick = (params) => {
    setSelectId(params.row);
  };

  const filteredRows = solicData.filter((row) => {
    if (
      (estadoFilter === "" || row.estado === estadoFilter) &&
      (tipoFilter === "" || row.tipo === tipoFilter)
    ) {
      return row;
    }
    return false;
  });

  // Definimos nuestras columnas
  const columns = [
    { field: "eCorreo", headerName: "Correo", width: 250 },
    { field: "motivo", headerName: "Motivo", width: 250 },
    { field: "tipo", headerName: "Tipo", width: 250 },
    { field: "estado", headerName: "Estado", width: 250 },
  ];

  return (
    <div>
      {/** Campo para filtrar el estado de la solicitud */}
      <TextField
        label="Estado"
        //fullWidth
        select
        variant="outlined"
        value={estadoFilter}
        onChange={handleEstadoFilterChange}
      >
        <MenuItem value="">Todos</MenuItem>
        <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
        <MenuItem value={"Aprovado"}>Aprovado</MenuItem>
        <MenuItem value={"Rechazado"}>Rechazado</MenuItem>
      </TextField>

      {/** Campo para filtrar el tipo de la solicitud */}
      <TextField
        label="Tipo"
        //fullWidth
        select
        variant="outlined"
        value={tipoFilter}
        onChange={handleTipoFilterChange}
      >
        <MenuItem value="">Todos</MenuItem>
        <MenuItem value={"Vacacion"}>Vacacion</MenuItem>
        <MenuItem value={"Turno"}>Turno</MenuItem>
      </TextField>
      {/** Tabla de datos */}
      <div style={{ width: "100%" }}>
        <div style={{ height: "60vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={filteredRows}
            columns={columns}
            disableColumnSelector
            disableDensitySelector
            hideFooter
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default SolicitudPage;
