"use client"

import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import Logo from "@/components/logo";
import Lienzo from "@/components/lienzo";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

function TurnoUsuario() {
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: "usuario", headerName: "Fecha de Inicio", width:400 },
    { field: "nombre", headerName: "Fecha de Fin", width: 400},
    { field: "tipo", headerName: "Motivo", width: 400},
    { field: "acciones", headerName: "Dias totales", width: 400 }
  ];

  const rows = [
    { id: 1, usuario: "Fernando Moncada Juarez", turno: "7:00 – 15:00, ", tipo: "Turno", acciones: "Detalles - Aceptar - Rechazar" },
    { id: 2, usuario: "Karime Alejandra", turno: "7:00 – 15:00, ", tipo: "Vacaciones", acciones: "Detalles - Aceptar - Rechazar" },
    { id: 3, usuario: "Alan de Jesus", turno: "7:00 – 15:00, ", tipo: "Turno", acciones: "Detalles - Aceptar - Rechazar" }
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
    <div style={{ background: "#93A2B9" }}>
      <Grid container columnSpacing={2} rowSpacing={2} p={2}>
        <Grid item xs={3}>
          <Logo />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={12}>
          <Lienzo>
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
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
          </Lienzo>
        </Grid>
      </Grid>
    </div>
  );
}

export default TurnoUsuario;


/*const columns = [
  { field: "fechaI", headerName: "Fecha de Inicio", width:300 },
  { field: "fechaF", headerName: "Fecha de Fin", width: 300},
  { field: "motivo", headerName: "Motivo", width: 300},
  { field: "dias", headerName: "Dias totales", width: 300 },
  { field: "edo", headerName: "Estado", width: 200 },
];

const rows = [
  { id: 1, fechaI: "15/05/2024", fechaF: "22/05/2024", motivo: "Semana Santa", dias: "7", edo: "Aprobada - Rechazada"  },
  { id: 2, fechaI: "02/10/72024", fechaF: "7/10/2024", motivo: "Descanso", dias: "5", edo: "Aprobada - Rechazada"  },
  { id: 3, fechaI: "07/12/2024", fechaF: "13/02/2024", motivo: "Navidad", dias: "6", edo: "Aprobada - Rechazada"  },*/