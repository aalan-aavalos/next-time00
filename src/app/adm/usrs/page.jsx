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
import React from "react";

function SedePage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Buscar</h2>
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
            handleClose();
          },
        }}
      >
        <DialogTitle alignSelf="center">Registro de usuarios</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                required
                label="Nombre/s"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                required
                label="Apellido paterno"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                required
                label="Apellido materno"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
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
