"use client";

import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
 
} from "@mui/material";

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newUser, setNewUser] = useState({
    nombreSede: "",
    ubicacion: "",
    Adminstradores: [],

  });
  const [datosArea, setDatosArea] = useState([]);
  const [datosUsrs, setDatosUsrs] = useState([]);

  useEffect(() => {
    const loadSedes = async () => {
      try {
        const respuesta = await fetch("/api/sedes");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos de sedes");
        }
        const datosJson = await respuesta.json();
        setDatos(datosJson);
      } catch (error) {
        console.error("Error al cargar los datos de sedes:", error);
      }
    };
  
    loadSedes();
  }, []);
  
  useEffect(() => {
    const loadAreas = async () => {
      try {
        const respuesta = await fetch("/api/area");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos de áreas");
        }
        const datosJson = await respuesta.json();
        setDatosArea(datosJson);
      } catch (error) {
        console.error("Error al cargar los datos de áreas:", error);
      }
    };
  
    loadAreas();
  }, []);
  
  useEffect(() => {
    const loadUsrs = async () => {
      try {
        const respuesta = await fetch("/api/usrs");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos de usuarios");
        }
        const datosJson = await respuesta.json();
        setDatosUsrs(datosJson);
      } catch (error) {
        console.error("Error al cargar los datos de usuarios:", error);
      }
    };
  
    loadUsrs();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateMode(false);
    setNewUser({ nombreSede: "", ubicacion: "", Adminstradores: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({ nombreSede: "", ubicacion: "", Adminstradores: "" });
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
    setNewUser({ nombreSede: "", ubicacion: "", Adminstradores: "" });
  };

  const createUser = async (user) => {
    const response = await fetch("/api/sedes", {
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
    const response = await fetch(`/api/sedes/${userId}`, {
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

    const response = await fetch(`/api/sedes/${selectedUserId}`, {
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


  const [updateMode, setUpdateMode] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);










  const columns = [
    { field: "nombreSede", headerName: "Nombre de la nueva sede", width: 400 },
    { field: "ubicacion", headerName: "Ubicacion", width: 400 },
    { field: "Adminstradores", headerName: "Administradores", width: 400 },
    {field: "areas", headerName: "Areas", width:400}
  ];
  // const areas = datosArea
 const adm = datosUsrs


  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterValues: [""],
  });




  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <div>
      <Fab
        color="dark"
        aria-label="add"
        onClick={handleClickOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "3vw", marginTop:"2vw",marginLeft:"2vw" }}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="edit"
        onClick={handleEditClick}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "3vw",marginTop:"2vw" }}
        disabled={!selectedUserId}
      >
        <EditIcon />
      </Fab>
      <Fab
        color="dark"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginTop: "2vw", marginRight:"2vw"}}
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

          onSubmit: () => {
            handleSubmit();
          },

          style: {
            background: "#93A2B9",
          },
        }}
      >
        <DialogTitle alignSelf="center">
          {updateMode ? "Actualizar Sede" : "Registro de Sede"}
        </DialogTitle>
       
        <DialogContent>
  <Grid container columnSpacing={1} p={1} rowSpacing={2}>
    <Grid item xs={4}>
      <TextField
        autoFocus
        name="nombreSede"
        required
        label="Nombre Sede"
        type="text"
        fullWidth
        variant="outlined"
        value={newUser.nombreSede}
        onChange={handleChange}
      />
    </Grid>
    
    <Grid item xs={4}>
      <TextField
        autoFocus
        name="ubicacion"
        required
        label="Ubicación"
        type="text"
        fullWidth
        variant="outlined"
        value={newUser.ubicacion}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={4}>
      {/*<TextField
        autoFocus
        name="Adminstradores"
        required
        label="Administradores"
        type="text"
        fullWidth
        variant="outlined"
        value={newUser.Adminstradores}
        onChange={handleChange}
      />*/}
      {/*<Grid>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={areas}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: "2wv"}}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccionar Areas"
              placeholder="Areas"
            />
          )}
        />

          </Grid>*/}

      <Grid>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={adm}
          disableCloseOnSelect
          getOptionLabel={(option) => option.eNombre}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: "2wv"}}
                checked={selected}
              />
              {option.eNombre}
            </li>
          )}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccionar Administradores"
              placeholder="Administradores"
            />
          )}
        />

      </Grid>
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


        {/** ------------------------------------------------------------------- */}
        <DialogTitle alignSelf="center">
          {updateMode ? "Actualizar Area" : "Registro de Area"}
          
           </DialogTitle>
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

export default UsersPage;
