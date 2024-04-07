"use client";

import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  TextField,
  MenuItem,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function SolicitudPage() {
  const solictudModel = {
    estado: "",
  };

  // Guardar los estados de los filtros
  const [estadoFilter, setEstadoFilter] = useState("Pendiente");
  const [tipoFilter, setTipoFilter] = useState("");

  // Guardar los datos del back
  const [solicData, setSolicData] = useState([]);

  // Guardar los datos de las fias seleccionadas
  const [selectRow, setSelectRow] = useState(null);

  // Abrir cuadro de confirmacion
  const [confirmDialog, setConfirmDialog] = useState(false);

  // Mensaje
  const [message, setMessage] = useState("");

  // Solicitud
  const [solicitud, setSolicitud] = useState(solictudModel);

  // Traer datos del backend
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

  const updateSolic = async (solicId, solicUpData) => {
    const response = await fetch(`/api/solicitud/${solicId}`, {
      method: "PUT",
      body: JSON.stringify(solicUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedUsers = solicData.map((solic) =>
        solic._id === solicId ? { ...solic, ...solicUpData } : solic
      );
      setSolicData(updatedUsers);
      setSelectRow(null);
      setConfirmDialog(false);
    }
  };

  const sendEmail = async (dataEmail) => {
    const response = await fetch("/api/send/status", {
      method: "POST",
      body: JSON.stringify(dataEmail),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New email sent:", data);
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
    setSelectRow(params.row);
  };

  // Acciones si se presiona el boton de aceptar
  const handleAceptClick = () => {
    setMessage("Aprovar");
    setSolicitud({ estado: "Aprovada" });
    setConfirmDialog(true);
  };

  // Acciones si se presiona el boton de rechazar
  const handleRejectClick = () => {
    setMessage("Rechazar");
    setSolicitud({ estado: "Rechazada" });
    setConfirmDialog(true);
  };

  // Acciones al subir el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateSolic(selectRow._id, solicitud);
    await sendEmail(selectRow);
    setSolicitud(solictudModel);
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
      <h1>Total: {filteredRows.length}</h1>
      {/** Boton para aprobar */}
      <Fab
        color="primary"
        aria-label="acept"
        onClick={handleAceptClick}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
        disabled={!selectRow}
      >
        <CheckIcon />
      </Fab>

      {/** Boton para rechazar */}
      <Fab
        color="error"
        aria-label="reject"
        onClick={handleRejectClick}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
        disabled={!selectRow}
      >
        <CloseIcon />
      </Fab>

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
        <MenuItem value={"Aprovada"}>Aprovada</MenuItem>
        <MenuItem value={"Rechazada"}>Rechazada</MenuItem>
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
        <div style={{ height: "50vh", width: "100%" }}>
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

      {/** Cuadro de confirmación */}
      <Dialog
        open={confirmDialog}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle alignSelf="center">
          ¿Estas seguro que deseas {message} la solicitud?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setConfirmDialog(false)}
          >
            Cancelar
          </Button>

          <Button variant="contained" color="primary" type="submit">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SolicitudPage;
