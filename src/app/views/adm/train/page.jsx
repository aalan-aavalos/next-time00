"use client";
import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";

import Checkbox from "@mui/material/Checkbox";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const TrainingPage = () => {
  const trainingModel = {
    nombre: "",
    fechaI: "",
    fechaF: "",
    motivo: "",
    Administradores: [],
    Empleados: [],
    tipo: "training",
  };
  const [open, setOpen] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newTraining, setNewTraining] = useState(trainingModel);

  const [updateMode, setUpdateMode] = useState(false);
  const [selectedTrainingData, setSelectedTrainingData] = useState(null);
  const [datosUsrs, setDatosUsrs] = useState([]);

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

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const respuesta = await fetch("/api/training");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        setDatos(datosJson);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadTrainings();
  }, []);

  const sendEmail = async (email) => {
    const response = await fetch("/api/send/tra", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New email sent:", data);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateMode(false);
    setNewTraining(trainingModel);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTraining(trainingModel);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleChange = (event) => {
    setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Datos enviados al backend:", newTraining);

    if (updateMode) {
      await updateTraining(selectedTrainingId, newTraining);
    } else {
      // Aqui va el enviar un correo
      await sendEmail({ eCorreo: correosFiltrados, ...newTraining });
      //console.log("Correo?:",{ eCorreo: correosFiltrados, ...newTraining  });
      await createTraining({ eCorreo: correosFiltrados, ...newTraining });
    }
    setOpen(false);
    setNewTraining(trainingModel);
  };

  const createTraining = async (training) => {
    const response = await fetch("/api/training", {
      method: "POST",
      body: JSON.stringify(training),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New Training created:", data);
    setDatos([...datos, data]);
  };

  const updateTraining = async (trainingId, trainingData) => {
    const response = await fetch(`/api/training/${trainingId}`, {
      method: "PUT",
      body: JSON.stringify(trainingData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedTrainings = datos.map((training) =>
        training._id === trainingId
          ? { ...training, ...trainingData }
          : training
      );
      setDatos(updatedTrainings);
      setSelectedTrainingId(null);
      setUpdateMode(false);
    }
  };

  const deleteTraining = async () => {
    if (!selectedTrainingId) return;

    const response = await fetch(`/api/training/${selectedTrainingId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedTrainings = datos.filter(
        (training) => training._id !== selectedTrainingId
      );
      setDatos(updatedTrainings);
      setSelectedTrainingId(null);
    }

    setConfirmOpen(false);
  };

  const handleRowClick = (params) => {
    setSelectedTrainingId(params.row._id);
    setSelectedTrainingData(params.row);
    setNewTraining(params.row);
  };

  const handleDetailsClick = () => {
    setDetailsOpen(true);
    setSelectedTrainingDetails(selectedTrainingData);
  };

  const handleEditClick = () => {
    setUpdateMode(true);
    setOpen(true);

    // Verificar y convertir las fechas al formato correcto si es necesario
    const formattedTraining = {
      ...selectedTrainingData,
      fechaI:
        selectedTrainingData.fechaI instanceof Date
          ? selectedTrainingData.fechaI.toISOString().split("T")[0]
          : selectedTrainingData.fechaI,
      fechaF:
        selectedTrainingData.fechaF instanceof Date
          ? selectedTrainingData.fechaF.toISOString().split("T")[0]
          : selectedTrainingData.fechaF,
    };

    setNewTraining(formattedTraining);
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
    { field: "nombre", headerName: "Nombre del Training", width: 200 },
    { field: "fechaI", headerName: "Fecha de Inicio", width: 200 },
    { field: "fechaF", headerName: "Fecha de Fin", width: 200 },
    { field: "motivo", headerName: "Motivo", width: 200 },
    {
      field: "dias",
      headerName: "Días totales",
      width: 200,
      renderCell: (params) => {
        const dias = calcularDiferenciaDias(
          params.row.fechaI,
          params.row.fechaF
        );
        return dias;
      },
    },
  ];

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterValues: [""],
  });

  const emp = newTraining.Empleados !== undefined ? newTraining.Empleados : [];
  const adm =
    newTraining.Administradores !== undefined
      ? newTraining.Administradores
      : [];

  const final = [...emp, ...adm];

  const correosFiltrados = datosUsrs
    .filter((usuario) => final.includes(`${usuario.eNombre} ${usuario.eApeP}`))
    .map((usuario) => usuario.eCorreo);

  console.log(correosFiltrados);
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
        disabled={!selectedTrainingId}
      >
        <EditIcon />
      </Fab>
      {/*
        <Fab
          color="primary"
          aria-label="details"
          onClick={handleDetailsClick}
          p={1}
          style={{ fontSize: 20, marginBottom: "2vh", marginRight: "1vw" }}
          disabled={!selectedTrainingId}
        >
          <InfoIcon />
        </Fab>
      */}
      <Fab
        color="secondary"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh" }}
        disabled={!selectedTrainingId}
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
            background: "#787571",
          },
        }}
      >
        <DialogTitle alignSelf="center">
          {updateMode ? "Actualizar Training" : "Nuevo Training"}
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="nombre"
                required
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={newTraining.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="fechaI"
                required
                label="Fecha de Inicio"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }} // Para que el label no se superponga después de seleccionar la fecha
                value={newTraining.fechaI}
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
                InputLabelProps={{ shrink: true }} // Para que el label no se superponga después de seleccionar la fecha
                value={newTraining.fechaF}
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
                value={newTraining.motivo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                multiple
                id="admin-autocomplete"
                options={(
                  (datosUsrs &&
                    datosUsrs.filter((usuario) => usuario.eRol === "adm")) ||
                  []
                ).map((admin) => `${admin.eNombre} ${admin.eApeP}`)}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={newTraining.Administradores}
                onChange={(event, newValue) => {
                  setNewTraining({ ...newTraining, Administradores: newValue });
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
                    label="Administradores"
                    placeholder="Selecciona administradores"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                multiple
                id="empleado-autocomplete"
                options={(
                  datosUsrs &&
                  datosUsrs.filter((usuario) => usuario.eRol === "emp")
                ).map((empleado) => `${empleado.eNombre} ${empleado.eApeP}`)}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={newTraining.Empleados}
                onChange={(event, newValue) => {
                  setNewTraining({ ...newTraining, Empleados: newValue });
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
                    label="Empleados"
                    placeholder="Selecciona Participantes"
                  />
                )}
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
          ¿Está seguro de que desea eliminar este Training?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={deleteTraining} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TrainingPage;
