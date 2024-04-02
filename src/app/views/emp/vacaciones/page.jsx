"use client";
import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { signOut, useSession } from "next-auth/react";
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

const VacacionesPage = () => {
  const { data: session, status } = useSession();

  const sessionData = session ? session.user : {};

  const vacacionModel = {
    fechaI: "",
    fechaF: "",
    motivo: "",
    estado: "Pendiente",
    eCorreo: sessionData.eCorreo,
  }

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newUser, setNewUser] = useState(vacacionModel);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const respuesta = await fetch("/api/vacacion");
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
    setNewUser(vacacionModel);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser(vacacionModel);
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
    setNewUser(vacacionModel);
  };

  const createUser = async (user) => {
    const response = await fetch("/api/vacacion", {
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
    const response = await fetch(`/api/vacacion/${userId}`, {
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

    const response = await fetch(`/api/vacacion/${selectedUserId}`, {
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
    // Configurar el estado newUser con los datos del usuario seleccionado
    setNewUser({
      fechaI: selectedUserData.fechaI || "",
      fechaF: selectedUserData.fechaF || "",
      motivo: selectedUserData.motivo || "",
    });
  };
  // Calcula la diferencia de días entre dos fechas
  const calcularDiferenciaDias = (fechaI, fechaF) => {
    const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día
    const fechaInicioMs = new Date(fechaI).getTime(); // Convertir fecha de inicio a milisegundos
    const fechaFinMs = new Date(fechaF).getTime(); // Convertir fecha de fin a milisegundos

    // Calcular diferencia en milisegundos
    const diferenciaMs = Math.abs(fechaFinMs - fechaInicioMs);

    // Calcular diferencia en días y redondear al entero más cercano
    const diferenciaDias = Math.round(diferenciaMs / unDia);

    return diferenciaDias;
  };

  const columns = [
    { field: "fechaI", headerName: "Fecha de Inicio", width: 300 },
    { field: "fechaF", headerName: "Fecha de Fin", width: 300 },
    { field: "motivo", headerName: "Motivo", width: 300 },
    {
      field: "dias",
      headerName: "Días totales",
      width: 300,
      renderCell: (params) => {
        const dias = calcularDiferenciaDias(
          params.row.fechaI,
          params.row.fechaF
        );
        return dias;
      },
    },
    { field: "estado", headerName: "Estado", width: 200 },
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
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
      >
        <AddIcon />
      </Fab>
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
      <Fab
        color="secondary"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh" }}
        disabled={!selectedUserId}
      >
        <DeleteIcon />
      </Fab>
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          style: {
            background: "#93A2B9",
          },
        }}
      >
        <DialogTitle alignSelf="center">
          {updateMode ? "Actualizar Vacaciones" : "Registro de Vacaciones"}
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="fechaI"
                required
                label="Fecha de Inicio"
                type="date"
                fullWidth
                variant="outlined"
                value={newUser.fechaI} // Add the value prop
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="fechaF"
                required
                label="Fecha de Fin"
                type="date"
                fullWidth
                variant="outlined"
                value={newUser.fechaF} // Add the value prop
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="motivo"
                required
                label="Motivo"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.motivo}
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
    </div>
  );
};

export default VacacionesPage;
