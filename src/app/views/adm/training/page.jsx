"use client";
import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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

const TrainingPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newTraining, setNewTraining] = useState({
    nombre: "",
    fechaI: "",
    fechaF: "",
    motivo: "",
    detalles:""

  });
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedTrainingData, setSelectedTrainingData] = useState(null);

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

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateMode(false);
    setNewTraining({ nombre:"", fechaI: "", fechaF: "", motivo: "", detalles:""});
  };

  const handleClose = () => {
    setOpen(false);
    setNewTraining({ nombre:"", fechaI: "", fechaF: "", motivo: "", detalles:""  });
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
    console.log("Datos enviados al backend:", newTraining); // Agrega este registro para verificar los datos antes de enviar la solicitud
    if (updateMode) {
      await updateTraining(selectedTrainingId, newTraining);
    } else {
      await createTraining(newTraining);
    }
    setOpen(false);
    setNewTraining({ nombre:"", fechaI: "", fechaF: "", motivo: "", detalles:"" });
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
        training._id === trainingId ? { ...training, ...trainingData } : training
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
      const updatedTrainings = datos.filter((training) => training._id !== selectedTrainingId);
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

  const handleEditClick = () => {
    setUpdateMode(true);
    setOpen(true);
  
    // Verificar y convertir las fechas al formato correcto si es necesario
    const formattedTraining = {
      ...selectedTrainingData,
      fechaI: selectedTrainingData.fechaI instanceof Date ? selectedTrainingData.fechaI.toISOString().split("T")[0] : selectedTrainingData.fechaI,
      fechaF: selectedTrainingData.fechaF instanceof Date ? selectedTrainingData.fechaF.toISOString().split("T")[0] : selectedTrainingData.fechaF,
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
    { field: "detalles", headerName: "Detalles", width: 200 },
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
        disabled={!selectedTrainingId}
      >
        <EditIcon />
      </Fab>
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
            background: "#93A2B9",
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
