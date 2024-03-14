"use client"
import React from "react";
import {
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Logo from "@/components/logo";
import Lienzo from "@/components/lienzo";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function VacacionesPage() {
  const [open, setOpen] = React.useState(false);
  const [selectedHorario, setSelectedHorario] = React.useState("");
  const [selectedTipo, setSelectedTipo] = React.useState("");

  const horariosCatalogo = [
    "8:00 - 12:00",
    "13:00 - 17:00",
    "18:00 - 22:00",
    // Agrega más horarios según sea necesario
  ];

  const tiposCatalogo = [
    "Mañana",
    "Tarde",
    "Noche",
    // Agrega más tipos según sea necesario
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHorarioChange = (event) => {
    setSelectedHorario(event.target.value);
  };

  const handleTipoChange = (event) => {
    setSelectedTipo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Tipo seleccionado:", selectedTipo);
    console.log("Horario seleccionado:", selectedHorario);
    handleClose();
  };

  const handleUpdate = () => {
    // Lógica para manejar la actualización de la solicitud de vacaciones
  };

  const handleDelete = () => {
    // Lógica para manejar la eliminación de la solicitud de vacaciones
  };

  const columns = [
    { field: "fechaI", headerName: "Fecha de Inicio", width: 300 },
    { field: "fechaF", headerName: "Fecha de Fin", width: 300 },
    { field: "motivo", headerName: "Motivo", width: 300 },
    { field: "dias", headerName: "Dias totales", width: 300 },
    { field: "edo", headerName: "Estado", width: 200 },
  ];

  const rows = [
    {
      id: 1,
      fechaI: "15/05/2024",
      fechaF: "22/05/2024",
      motivo: "Semana Santa",
      dias: "7",
      edo: "Aprobada - Rechazada",
    },
    {
      id: 2,
      fechaI: "02/10/72024",
      fechaF: "7/10/2024",
      motivo: "Descanso",
      dias: "5",
      edo: "Aprobada - Rechazada",
    },
    {
      id: 3,
      fechaI: "07/12/2024",
      fechaF: "13/02/2024",
      motivo: "Navidad",
      dias: "6",
      edo: "Aprobada - Rechazada",
    },
    // Agrega más filas según sea necesario
  ];

  return (
    <div style={{ background: "#93A2B9" }}>
      <Grid container columnSpacing={2} rowSpacing={2} p={2}>
        <Grid item xs={3}>
          <Logo />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={12}>
          <Lienzo>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  background: "#93A2B9",
                  width: "600px", // Ajusta el ancho según sea necesario
                  maxHeight: "80%", // Ajusta la altura máxima según sea necesario
                },
                component: "form",
                onSubmit: handleSubmit,
              }}
            >
              <DialogTitle>Solicitud de Vacaciones</DialogTitle>
              <DialogContent style={{ marginTop: "20px" }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="fechaInicio"
                  label="Fecha de Inicio"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginBottom: "20px" }}
                />
                <TextField
                  required
                  margin="dense"
                  id="fechaFin"
                  label="Fecha de Fin"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginBottom: "20px" }}
                />
                <TextField
                  required
                  margin="dense"
                  id="motivo"
                  label="Motivo"
                  multiline
                  rows={4}
                  fullWidth
                  style={{ marginBottom: "20px" }}
                />
              </DialogContent>

              <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="contained" type="submit">
                  Solicitar
                </Button>
                <Button variant="contained" onClick={handleUpdate} color="primary">
                  Actualizar
                </Button>
                <Button variant="contained" onClick={handleDelete} color="secondary">
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
            <Fab
              color="dark"
              aria-label="add"
              onClick={handleClickOpen}
              style={{ marginTop: "2px", fontSize: 20, margin: "30px" }}
            >
              <AddIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="edit"
              onClick={handleUpdate}
              style={{ marginTop: "2px", fontSize: 20, margin: "30px" }}
            >
              <EditIcon />
            </Fab>
            <Fab
              color="secondary"
              aria-label="delete"
              onClick={handleDelete}
              style={{ marginTop: "2px", fontSize: 20, margin: "30px" }}
            >
              <DeleteIcon />
            </Fab>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
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

export default VacacionesPage;
