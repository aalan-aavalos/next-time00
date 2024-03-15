"use client";

import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/InfoSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  const usrsModel = {
    eNombre: "",
    eApeP: "",
    eApeM: "",
    eRol: "",
    eEdad: 0,
    eNumero: 0,
    eCorreo: "",
  };

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newUser, setNewUser] = useState(usrsModel);

  const [updateMode, setUpdateMode] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false); // State para abrir/cerrar detalles
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); // Detalles del usuario seleccionado

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
    setUpdateMode(false);
    setNewUser(usrsModel);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser(usrsModel);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updateMode) {
      await updateUser(selectedUserId, newUser);
    } else {
      await createUser(newUser);
    }
    setOpen(false);
    setNewUser(usrsModel);
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
    setDatos([...datos, data]);
  };

  const updateUser = async (userId, userData) => {
    const response = await fetch(`/api/usrs/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedUsers = datos.map((user) =>
        user._id === userId ? { ...user, ...userData } : user
      );
      setDatos(updatedUsers);
      setSelectedUserId(null);
      setUpdateMode(false);
    }
  };

  const deleteUser = async () => {
    if (!selectedUserId) return;

    const response = await fetch(`/api/usrs/${selectedUserId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedUsers = datos.filter((user) => user._id !== selectedUserId);
      setDatos(updatedUsers);
      setSelectedUserId(null);
    }

    setConfirmOpen(false);
  };

  const handleRowClick = (params) => {
    setSelectedUserId(params.row._id);
    setSelectedUserData(params.row);
    setNewUser(params.row);
  };

  const handleEditClick = () => {
    setUpdateMode(true);
    setOpen(true);
  };

  const handleDetailsClick = () => {
    setDetailsOpen(true);
    // Aquí puedes cargar los detalles del usuario seleccionado para mostrarlos en el diálogo de detalles
    // Puedes usar el estado 'selectedUserData' para esto.
    setSelectedUserDetails(selectedUserData);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    //setSelectedUserDetails(null);
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
      {/** Boton de agregar */}
      <Fab
        color="dark"
        aria-label="add"
        onClick={handleClickOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
      >
        <AddIcon />
      </Fab>

      {/** Boton de editar */}
      <Fab
        color="primary"
        aria-label="edit"
        onClick={handleEditClick}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
        disabled={!selectedUserId}
      >
        <EditIcon />
      </Fab>

      {/** Boton de ver detalles */}
      <Fab
        color="primary"
        aria-label="details"
        onClick={handleDetailsClick}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
        disabled={!selectedUserId}
      >
        <InfoIcon />
      </Fab>

      {/** Boton de eliminar */}
      <Fab
        color="secondary"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
        disabled={!selectedUserId}
      >
        <DeleteIcon />
      </Fab>

      {/** Tabla de datos */}
      <div style={{ width: "100%" }}>
        <div style={{ height: "60vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={datos}
            columns={columns}
            disableColumnSelector
            disableDensitySelector
            filterModel={filterModel}
            onFilterModelChange={setFilterModel}
            hideFooter
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      {/** Ventana emergente del formulario */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "form",

          onSubmit: () => {
            handleSubmit();
          },

          style: {
            background: "#93A2B9",
          },
        }}
      >
        <DialogTitle alignSelf="center">
          {updateMode ? "Actualizar usuario" : "Registro de usuarios"}
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            
            {/** Campo para el nombre (eNombre) */}
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="eNombre"
                required
                label="Nombre/s"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.eNombre}
                onChange={handleChange}
              />
            </Grid>

            {/** Campo para el nombre (eApeP) */}
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="eApeP"
                required
                label="Apellido paterno"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.eApeP}
                onChange={handleChange}
              />
            </Grid>

            {/** Campo para el nombre (eApeM) */}
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="eApeM"
                required
                label="Apellido materno"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.eApeM}
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
            {updateMode ? "Actualizar" : "Registrar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/** Ventana emergente para confirmar la eliminacion  */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        fullWidth
        PaperProps={{
          style: {
            background: "#93A2B9",
          },
        }}
      >
        <DialogTitle alignSelf="center">Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Está seguro de que desea eliminar este usuario?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={deleteUser} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/** Ventana emergente para mostrar detalles del usuario */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        PaperProps={{
          style: {
            background: "#93A2B9",
          },
        }}
      >
        <DialogTitle alignSelf="center">Detalles del Usuario</DialogTitle>
        {selectedUserDetails && (
          <DialogContent>
            <p>Nombre: {selectedUserDetails.eNombre}</p>
            <TextField
              disabled
              id="outlined-disabled"
              label="Nombre"
              defaultValue={selectedUserData.eNombre}
            />
            <p>Apellido Paterno: {selectedUserDetails.eApeP}</p>
            <p>Apellido Materno: {selectedUserDetails.eApeM}</p>
            <p>Correo electronico: {selectedUserDetails.eCorreo}</p>
            <p>Apellido Materno: {selectedUserDetails.eEdad}</p>
            <p>Apellido Materno: {selectedUserDetails.eRol}</p>
            <p>Apellido Materno: {selectedUserDetails.eNumero}</p>
            {/* Aquí puedes agregar más detalles del usuario si es necesario */}
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDetails}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
