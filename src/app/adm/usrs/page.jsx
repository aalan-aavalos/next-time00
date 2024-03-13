"use client";
import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const UsersPage = () => {
  const [open, setOpen] = useState(false);

  const [datos, setDatos] = useState([]);

  const [newUser, setNewUser] = useState({
    eNombre: "",
    eApeP: "",
    eApeM: "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const respuesta = await fetch("/api/usrs");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        setDatos(datosJson);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser(newUser);
    setOpen(false);
    window.location.reload();
  };

  const createUser = async (user) => {
    const response = await fetch("/api/usrs", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New user created:", data);
  };

  const columns = [
    { field: "eNombre", headerName: "Nombre", width: 400 },
    { field: "eApeP", headerName: "Apellido Paterno", width: 400 },
    { field: "eApeM", headerName: "Apellido Materno", width: 400 },
  ];

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterValues: [""],
  });

  return (
    <div>
      <Fab
        color="dark"
        aria-label="add"
        onClick={handleClickOpen}
        p={1}
        style={{ fontSize: 20 }}
      >
        <AddIcon />
      </Fab>
      {/*<DataGrid
        getRowId={(row) => row._id}
        rows={datos}
        columns={columns}
        style={{ fontSize: 20 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />*/}
      <div style={{ width: "100%" }}>
        <div style={{ height: "60vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={datos}
            columns={columns}
            filterModel={filterModel}
            onFilterModelChange={setFilterModel}
            disableColumnSelector
            disableDensitySelector
            hideFooter
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            checkboxSelection
          />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          style: {
            background: "#93A2B9",
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
    </div>
  );
};

export default UsersPage;
