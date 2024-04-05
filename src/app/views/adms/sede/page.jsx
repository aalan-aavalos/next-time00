"use client";

import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import cpData from "../sede/cp.json";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  MenuItem,
  Select,
} from "@mui/material";

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newUser, setNewUser] = useState({
    nombreSede: "",
    codigoPostal: "",
    estado: "",
    municipio: "",
    Adminstradores: [],
    aNombre: [],
  });
  const [datosArea, setDatosArea] = useState([]);
  const [datosUsrs, setDatosUsrs] = useState([]);
  const [areasByType, setAreasByType] = useState([]);
  const [codigoPostal, setCodigoPostal] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");

  useEffect(() => {
    const loadSedes = async () => {
      try {
        const respuesta = await fetch("/api/sedes");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos de sedes");
        }
        const datosJson = await respuesta.json();
        console.log(datosJson); // Agrega este console.log para ver los datos
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
        const respuesta = await fetch("/api/areas");
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
    setNewUser({
      nombreSede: "",
      codigoPostal: "",
      estado: "",
      municipio: "",
      Adminstradores: [],
      aNombre: [],
    });
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({
      nombreSede: "",
      codigoPostal: "",
      estado: "",
      municipio: "",
      Adminstradores: [],
      aNombre: [],
    });
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });

    // Aquí se puede agregar una lógica adicional para actualizar las áreas según el tipo seleccionado
    const areasFilteredByType = datosArea.filter(
      (area) => area.tipoArea === value
    );
    setAreasByType(areasFilteredByType);
  };

  const buscarCodigoPostal = () => {
    const codigoPostalBuscado = codigoPostal.trim();
    const municipioEncontrado = cpData.find(
      (municipio) =>
        municipio.codigo_postal_oficina === codigoPostalBuscado ||
        municipio.codigo_postal_asentamiento === codigoPostalBuscado
    );
    if (municipioEncontrado) {
      setEstado(municipioEncontrado.nombre_estado);
      setMunicipio(municipioEncontrado.nombre_municipio);
    } else {
      console.log("Código postal no encontrado");
      // Aquí puedes manejar el caso en el que el código postal no se encuentre
      setEstado(""); // Restablece el estado de Estado
      setMunicipio(""); // Restablece el estado de Municipio
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updateMode) {
      await updateUser(selectedUserId, newUser);
    } else {
      // Incluye los valores actualizados de codigoPostal, estado y municipio
      const newUserWithLocation = {
        ...newUser,
        codigoPostal: codigoPostal,
        estado: estado,
        municipio: municipio,
      };
      await createUser(newUserWithLocation);
    }
    setOpen(false);
    setNewUser({
      nombreSede: "",
      codigoPostal: "",
      estado: "", // Restablece el estado de Estado
      municipio: "", // Restablece el estado de Municipio
      Adminstradores: [],
      aNombre: [],
    });
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

  const handleChangeCodigoPostal = (event) => {
    const { value } = event.target;
    setCodigoPostal(value);
  };

  const handleChangeEstado = (event) => {
    const { value } = event.target;
    setEstado(value);
  };

  const handleChangeMunicipio = (event) => {
    const { value } = event.target;
    setMunicipio(value);
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

  const handleOnChange = (event, newValue) => {
    setNewUser({ ...newUser, Adminstradores: newValue });
  };

  const [updateMode, setUpdateMode] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const columns = [
    { field: "nombreSede", headerName: "Nombre de la nueva sede", width: 400 },
    { field: "codigoPostal", headerName: "Código Postal", width: 200 },
    { field: "estado", headerName: "Estado", width: 200 },
    { field: "municipio", headerName: "Municipio", width: 200 },
    { field: "Adminstradores", headerName: "Administradores", width: 400 },
    { field: "aNombre", headerName: "Areas", width: 400 },
  ];
  {
    /*const areas = [datosArea];*/
  }
  const areas = datosArea.map((area) => area.aNombre);
  const adm = datosUsrs;

  const tiposAreaUnicos = datosArea
    .map((area) => area.tipoArea)
    .filter((value, index, self) => self.indexOf(value) === index);

  //console.log(datosArea);

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
        style={{
          fontSize: 20,
          marginBottom: "2vh",
          marginRight: "3vw",
          marginTop: "2vw",
          marginLeft: "2vw",
        }}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="edit"
        onClick={handleEditClick}
        p={1}
        style={{
          fontSize: 20,
          marginBottom: "2vh",
          marginRight: "3vw",
          marginTop: "2vw",
        }}
        disabled={!selectedUserId}
      >
        <EditIcon />
      </Fab>
      <Fab
        color="dark"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{
          fontSize: 20,
          marginBottom: "2vh",
          marginTop: "2vw",
          marginRight: "2vw",
        }}
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
            borderRadius: 8, // Añade bordes redondeados al diálogo
          },
        }}
      >
        <DialogTitle align="center">
          {updateMode ? "Actualizar Sede" : "Registro de Sede"}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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

            <Grid item xs={6}>
              <TextField
                name="codigoPostal"
                required
                disabled={updateMode ? true : false}
                label="Código Postal"
                type="text"
                fullWidth
                variant="outlined"
                value={codigoPostal}
                onChange={handleChangeCodigoPostal}
              />
            </Grid>
            <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={updateMode ? true : false}
                onClick={buscarCodigoPostal}
              >
                Buscar
              </Button>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="estado"
                label="Estado"
                type="text"
                fullWidth
                variant="outlined"
                value={estado}
                onChange={handleChangeEstado}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="municipio"
                label="Municipio"
                type="text"
                fullWidth
                variant="outlined"
                value={municipio}
                onChange={handleChangeMunicipio}
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="admin-autocomplete"
                options={adm
                  .map((admin) => `${admin.eNombre} ${admin.eApeP}`)
                  .filter((option) => !newUser.Adminstradores.includes(option))}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={newUser.Adminstradores}
                onChange={handleOnChange}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<span className="checkbox-icon"></span>}
                      checkedIcon={
                        <span className="checkbox-icon checked"></span>
                      }
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ maxWidth: 300, margin: "0 auto" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Administradores"
                    placeholder="Selecciona administradores"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                name="tipoArea"
                required
                label="Tipo de Área"
                type="text"
                fullWidth
                variant="outlined"
                select
                onChange={handleChange}
              >
                {tiposAreaUnicos.map((ar) => (
                  <MenuItem key={ar} value={ar}>
                    {ar}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={areasByType.map((area) => area.aNombre)}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={newUser.aNombre}
                onChange={(event, newValue) => {
                  setNewUser({ ...newUser, aNombre: newValue });
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<span className="checkbox-icon"></span>}
                      checkedIcon={
                        <span className="checkbox-icon checked"></span>
                      }
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ maxWidth: 300, margin: "0 auto" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Areas"
                    placeholder="Selecciona áreas"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
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
          ¿Está seguro de que desea eliminar esta sede?
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
