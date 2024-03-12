"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function SedePage() {
  const [open, setOpen] = React.useState(false);

  // Funcion para abrir el dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Funcion para cerrar el dialog
  const handleClose = () => {
    setOpen(false);
  };

  const [newUsr, setNewUsr] = useState({
    eNombre: "",
    eApeP: "",
    eApeM: "",
  });

  const handleChange = (e) => {
    // ChangeEvent<HTMLInputElement. Asi se pone en typescript
    setNewUsr({ ...newUsr, [e.target.name]: e.target.value });
  };

  const createUsers = async () => {
    const res = await fetch("/api/usrs", {
      method: "POST",
      body: JSON.stringify(newUsr),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json()
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUsers();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          style: {
            background: "#93A2B9",
          },
          component: "form",
          onSubmit: () => {
            handleSubmit();
          },
        }}
      >
        <DialogTitle alignSelf="center">Registro de usuarios</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="eNombre"
                required
                label="Nombre/s"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="eApeP"
                required
                label="Apellido paterno"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="eApeM"
                required
                label="Apellido materno"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={handleClickOpen}>
        Agregar
      </Button>
    </div>
  );
}

export default SedePage;
