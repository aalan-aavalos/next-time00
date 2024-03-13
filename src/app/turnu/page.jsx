"use client";

import React from "react";
import {
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
} from "@mui/material";

import Logo from "@/components/logo";
import NavBar from "@/components/navbar";
import Lienzo from "@/components/lienzo";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";


function TurnoUsuario() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Definir las columnas para la tabla
  const columns = [
    { field: "fecha", headerName: "Fecha", width: 400 },
    { field: "turno", headerName: "Turno", width: 400 },
    { field: "horario", headerName: "Horario", width: 400},
    { field: "estado", headerName: "Estado", width: 400 },
  ];

  // Datos para la tabla
  const rows = [
    { id: 1, fecha: "01/03/2024", turno: "Mañana", horario: "8:00 - 12:00", estado: "Activo" },
    { id: 2, fecha: "02/03/2024", turno: "Tarde", horario: "13:00 - 17:00", estado: "Inactivo" },
    // Agrega más filas según sea necesario
  ];

  return (
    <div style={{ background: "#93A2B9" }}>
      <Grid container columnSpacing={2} rowSpacing={2} p={2}>
        <Grid item xs={3}>
          <Logo />
        </Grid>
        <Grid item xs={9}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Lienzo>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  background: "#93A2B9",
                },
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleClose();
                },
              }}
            >
              <DialogTitle>Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
            <Fab
      color="dark"
      aria-label="add"
      onClick={handleClickOpen}
      style={{ marginTop: "2px", fontSize: 20, margin:"30px" }}
      
      
    >
      <AddIcon />
    </Fab>
            {/* Aquí agregamos el componente DataGrid */}
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

export default TurnoUsuario;
