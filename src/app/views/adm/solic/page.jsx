"use client";

import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function SolicitudPage() {
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: "usuario", headerName: "Usuario", width: 400 },
    { field: "nombre", headerName: "Nombre", width: 400 },
    { field: "tipo", headerName: "Tipo", width: 400 },
    { field: "acciones", headerName: "Acciones", width: 400 },
  ];

  const rows = [
    {
      id: 1,
      usuario: "Fernando Moncada Juarez",
      turno: "7:00 – 15:00, ",
      tipo: "Turno",
      acciones: "Detalles - Aceptar - Rechazar",
    },
    {
      id: 2,
      usuario: "Karime Alejandra",
      turno: "7:00 – 15:00, ",
      tipo: "Vacaciones",
      acciones: "Detalles - Aceptar - Rechazar",
    },
    {
      id: 3,
      usuario: "Alan de Jesus",
      turno: "7:00 – 15:00, ",
      tipo: "Turno",
      acciones: "Detalles - Aceptar - Rechazar",
    },
    // Agrega más filas según sea necesario
  ];

  // Filtrar las filas según el texto de búsqueda y el filtro seleccionado
  const filteredRows = rows.filter((row) => {
    if (filter === "" || row.tipo === filter) {
      return row.usuario.toLowerCase().includes(searchText.toLowerCase());
    }
    return false;
  });

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          fullWidth
          style={{ marginRight: "120px", width: "500px" }}
        />
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="filter-label">Filtrar</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Vacaciones">Vacaciones</MenuItem>
            <MenuItem value="Turno">Turno</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default SolicitudPage;
