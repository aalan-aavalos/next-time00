"use client";
import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
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
  // State for the dialog
  const [open, setOpen] = useState(false);

  // State for new user data
  const [newUser, setNewUser] = useState({
    eNombre: "",
    eApeP: "",
    eApeM: "",
  });

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
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

    obtenerDatos();
  }, []);

  // Function to fetch users from the API
  const loadUsers = async () => {
    const response = await fetch("/api/usrs");
    const data = await response.json();
    return data;
  };

  // Function to handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle changes in the new user form
  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  // Function to submit the new user form
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser(newUser); // Call the function to create a new user
    setOpen(false); // Close the dialog after successful creation
    window.location.reload();
  };

  // Function to create a new user (likely implemented in a separate file)
  const createUser = async (user) => {
    const response = await fetch("/api/usrs", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New user created:", data); // Handle the response as needed
  };

  // Fetch users on component mount
  const columns = [
    { field: "eNombre", headerName: "Nombre", width: 400 },
    { field: "eApeP", headerName: "Apellido Paterno", width: 400 },
    { field: "eApeM", headerName: "Apellido Materno", width: 400 },
  ];

  return (
    <div>
      <DataGrid
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
      />
      <Button variant="contained" onClick={handleClickOpen}>
        Agregar
      </Button>
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
