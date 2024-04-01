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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const UsersPage = () => {
  const usrsModel = {
    eNombre: String,
    eApeP: String,
    eApeM: String,
    eRol: String,
    eEdad: Number,
    eNumero: Number,
    eCorreo: String,
    auSede: String,
    uArea: String,
    uTurno: String,
    pwd: String,
  };

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
  const [datos, setDatos] = useState([]);
  const [datosSede, setDatosSede] = useState([]);
  const [newUser, setNewUser] = useState(usrsModel);

  const [updateMode, setUpdateMode] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const [areasSede, setAreasSede] = useState([]);
  const [contrato, setContrato] = useState([]);
  // Añade un nuevo estado para almacenar la sede seleccionada
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");
  const [messageError, setMessageError] = useState("no hay");

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

  useEffect(() => {
    const loadContratos = async () => {
      try {
        const respuesta = await fetch("/api/contrato");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        setContrato(datosJson);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadContratos();
  }, []);

  useEffect(() => {
    const loadSedes = async () => {
      try {
        const respuesta = await fetch("/api/sedes");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos de sedes");
        }
        const datosJson = await respuesta.json();
        setDatosSede(datosJson);
      } catch (error) {
        console.error("Error al cargar los datos de sedes:", error);
      }
    };

    loadSedes();
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

  const handleConfirmCloseMessage = () => {
    setConfirmOpenMessage(false);
  };

  const handleSedeChange = (event) => {
    const sedeSeleccionada = event.target.value;
    setSedeSeleccionada(sedeSeleccionada);
    const sede = datosSede.find((sede) => sede.nombreSede === sedeSeleccionada);
    if (sede) {
      setAreasSede(sede.aNombre);
      // Reinicia el valor del área seleccionada cuando cambia la sede
      setNewUser({ ...newUser, auSede: sedeSeleccionada, uArea: "" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;

    if (name === "eEdad") {
      // Permitir solo números y asegurar que estén entre 0 y 99
      newValue = value.replace(/\D/g, "").slice(0, 2);
    }

    if (name === "eNumero") {
      // Permitir solo números y exactamente 10 caracteres
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "eRol") {
      // Reiniciar los campos al cambiar el rol
      setNewUser({ ...usrsModel, eRol: value });
    } else {
      setNewUser({ ...newUser, [name]: newValue });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si el correo ya está en uso antes de crear un nuevo usuario

    if (updateMode) {
      await updateUser(selectedUserId, newUser);
    } else {
      const existingUser = datos.find(
        (user) => user.eCorreo === newUser.eCorreo
      );

      if (newUser.eNumero.toString().length !== 10) {
        setMessageError("El número de teléfono debe tener 10 dígitos");
        setConfirmOpenMessage(true);
        return; // Detener el proceso de registro
      }

      if (existingUser) {
        setMessageError("Correo electronico ya esta en uso");
        setConfirmOpenMessage(true);
        return; // Detener el proceso de registro
      }
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
    setSelectedUserDetails(selectedUserData);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const columns = [
    { field: "eCorreo", headerName: "Correo", width: 250 },
    { field: "eNombre", headerName: "Nombre", width: 250 },
    { field: "eApeP", headerName: "Apellido Paterno", width: 250 },
    { field: "eApeM", headerName: "Apellido Materno", width: 250 },
    { field: "eEdad", headerName: "Edad", width: 100 },
    { field: "eRol", headerName: "Rol", width: 100 },
    { field: "auSede", headerName: "Sede", width: 150 },
    { field: "uArea", headerName: "Area", width: 150 },
  ];

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterValues: [""],
  });

  return (
    <div>
      {/** Boton para agregar */}
      <Fab
        color="dark"
        aria-label="add"
        onClick={handleClickOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
      >
        <AddIcon />
      </Fab>

      {/** Boton para editar */}
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

      {/** Boton para ver detalles */}
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

      {/** Boton para eliminar */}
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

      {/** Formulario de registro */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          style: {
            background: "#787571",
          },
        }}
      >
        <DialogTitle alignSelf="center">
          {updateMode ? "Actualizar usuario" : "Registro de usuarios"}
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            {/** Campo para el rol de 6 */}
            <Grid item xs={6}>
              <TextField
                name="eRol"
                value={newUser.eRol}
                label="Rol"
                onChange={handleChange}
                fullWidth
                autoFocus
                required
                select
                disabled={updateMode ? true : false}
                variant="outlined"
              >
                <MenuItem value={"emp"}>Empleado</MenuItem>
                <MenuItem value={"adm"}>Administrador</MenuItem>
                <MenuItem value={"sAdm"}>Super-administrador</MenuItem>
              </TextField>
            </Grid>

            {/** Campo para el nombre de 12 */}
            <Grid item xs={12}>
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

            {/** Campo para el apellido paterno de 6 */}
            <Grid item xs={6}>
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

            {/** Campo para el apellido materno de 6 */}
            <Grid item xs={6}>
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

            {/** Campo para la edad de 3 */}
            <Grid item xs={3}>
              <TextField
                autoFocus
                name="eEdad"
                required
                label="Edad"
                type="tel"
                fullWidth
                variant="outlined"
                value={newUser.eEdad}
                onChange={handleChange}
              />
            </Grid>

            {/** Campo para el telefono de 6 */}
            <Grid item xs={6}>
              <TextField
                autoFocus
                name="eNumero"
                required
                label="Numero de telefono"
                type="tel"
                fullWidth
                variant="outlined"
                value={newUser.eNumero}
                onChange={handleChange}
              />
            </Grid>

            {/** Campo para el correo de 12 */}
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="eCorreo"
                disabled={updateMode ? true : false}
                required
                label="Correo electronico"
                type="email"
                fullWidth
                variant="outlined"
                value={newUser.eCorreo}
                onChange={handleChange}
              />
            </Grid>

            {/** Campo para la contraseña de 6 */}
            {newUser.eRol === "adm" || newUser.eRol === "sAdm" ? (
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  name="pwd"
                  required
                  disabled={updateMode ? true : false}
                  label="Contraseña"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={newUser.pwd}
                  onChange={handleChange}
                />
              </Grid>
            ) : null}

            {/** Campo para la sede de 3 */}
            {newUser.eRol === "adm" || newUser.eRol === "emp" ? (
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  select
                  variant="outlined"
                  name="auSede"
                  value={newUser.auSede}
                  label="Sede"
                  required
                  onChange={(event) => {
                    handleSedeChange(event);
                  }}
                  fullWidth
                >
                  {datosSede.map((sede) => (
                    <MenuItem key={sede._id} value={sede.nombreSede}>
                      {sede.nombreSede}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : null}

            {/** Campo para la area de 3 */}
            {newUser.eRol === "emp" ? (
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  select
                  variant="outlined"
                  name="uArea"
                  value={newUser.uArea}
                  label="Área"
                  required
                  onChange={handleChange}
                  fullWidth
                >
                  {areasSede.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : null}

            {/** Campo para el turno 3 */}
            {newUser.eRol === "emp" ? (
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  select
                  variant="outlined"
                  name="uTurno"
                  value={newUser.uTurno}
                  label="Turno"
                  required
                  onChange={handleChange}
                  fullWidth
                >
                  {contrato.map((con) => (
                    <MenuItem
                      key={con._id}
                      value={con.tipo_contrato + con.hora_inicioFin}
                    >
                      {`${con.tipo_contrato} - ${con.hora_inicioFin}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
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

      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        PaperProps={{
          style: {
            background: "#787571",
          },
        }}
      >
        <DialogTitle alignSelf="center">Detalles del Usuario</DialogTitle>
        {selectedUserDetails && (
          <DialogContent>
            <Grid container columnSpacing={1} p={1} rowSpacing={2}>
              {/** Campo para el rol de 6 */}
              <Grid item xs={6}>
                <TextField
                  label="Rol"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eRol}
                >
                  <MenuItem value={"emp"}>Empleado</MenuItem>
                  <MenuItem value={"adm"}>Administrador</MenuItem>
                  <MenuItem value={"sAdm"}>Super-administrador</MenuItem>
                </TextField>
              </Grid>

              {/** Campo para el nombre de 12 */}
              <Grid item xs={12}>
                <TextField
                  label="Nombre/s"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eNombre}
                />
              </Grid>

              {/** Campo para el apellido paterno de 6 */}
              <Grid item xs={6}>
                <TextField
                  label="Apellido paterno"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eApeP}
                />
              </Grid>

              {/** Campo para el apellido materno de 6 */}
              <Grid item xs={6}>
                <TextField
                  label="Apellido materno"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eApeM}
                />
              </Grid>

              {/** Campo para la edad de 3 */}
              <Grid item xs={3}>
                <TextField
                  label="Edad"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eEdad}
                />
              </Grid>

              {/** Campo para el telefono de 6 */}
              <Grid item xs={6}>
                <TextField
                  label="Numero de telefono"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eNumero}
                />
              </Grid>

              {/** Campo para el correo de 12 */}
              <Grid item xs={12}>
                <TextField
                  label="Correo electronico"
                  fullWidth
                  variant="outlined"
                  disabled
                  defaultValue={selectedUserDetails.eCorreo}
                />
              </Grid>

              {/** Campo para la contraseña de 6 */}
              {newUser.eRol === "adm" || newUser.eRol === "sAdm" ? (
                <Grid item xs={6}>
                  <TextField
                    label="Contraseña"
                    fullWidth
                    variant="outlined"
                    disabled
                    defaultValue={selectedUserDetails.pwd}
                    type="password"
                  />
                </Grid>
              ) : null}

              {/** Campo para la sede de 3 */}
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Sede"
                  fullWidth
                  disabled
                  defaultValue={selectedUserDetails.auSede}
                />
              </Grid>

              {/** Campo para la area de 3 */}
              {newUser.eRol === "emp" ? (
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    label="Área"
                    fullWidth
                    disabled
                    defaultValue={selectedUserDetails.uArea}
                  />
                </Grid>
              ) : null}

              {/** Campo para el turno 3 */}
              {newUser.eRol === "emp" ? (
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    label="Turno"
                    fullWidth
                    disabled
                    defaultValue={selectedUserDetails.uTurno}
                  />
                </Grid>
              ) : null}
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDetails}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmOpenMessage}
        onClose={handleConfirmCloseMessage}
        PaperProps={{
          style: {
            background: "rgb(255, 0, 0)",
          },
        }}
      >
        <DialogTitle alignSelf="center">Error al insertar</DialogTitle>
        <DialogContent>{messageError}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmCloseMessage}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
