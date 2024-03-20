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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const ContratosPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedContratoId, setSelectedContratoId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newContrato, setNewContrato] = useState({
    tipo_contrato: "",
    duracion_jornada: "",
    hora_inicioFin: "",
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedContratoData, setSelectedContratoData] = useState(null);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  useEffect(() => {
    const loadContratos = async () => {
      try {
        const respuesta = await fetch("/api/contrato");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        const datosConId = datosJson.map((fila, index) => ({
          ...fila,
          _id: index + 1,
        }));
        setDatos(datosConId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadContratos();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateMode(false);
    setNewContrato({
      tipo_contrato: "",
      duracion_jornada: "",
      hora_inicioFin: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setNewContrato({
      tipo_contrato: "",
      duracion_jornada: "",
      hora_inicioFin: "",
    });
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleTipoContratoChange = (event) => {
    const { name, value } = event.target;
    let horasDisponibles = [];
    let duracionJornada = "";

    switch (value) {
      case "5d/2d":
        horasDisponibles = ["7:00 / 15:00", "15:00 / 23:00", "23:00 / 7:00"];
        duracionJornada = "8 horas";
        break;
      case "1d/2d":
        horasDisponibles = ["7:00 / 7:00", "19:00 / 19:00"];
        duracionJornada = "24 horas";
        break;
      case "6d/1d":
        horasDisponibles = [
          "6:00 / 12:00",
          "12:00 / 18:00",
          "18:00 / 23:59",
          "0:00 / 6:00",
        ];
        duracionJornada = "6 horas";
        break;
      default:
        horasDisponibles = [];
        duracionJornada = "";
        break;
    }

    setNewContrato((prevContrato) => ({
      ...prevContrato,
      [name]: value,
      duracion_jornada: duracionJornada, // Establece la duración de la jornada automáticamente
      hora_inicioFin: "", // Reinicia el valor de la hora de inicio/fin cuando cambia el tipo de contrato
    }));
    setHorasDisponibles(horasDisponibles);
  };

  const handleHoraInicioFinChange = (event) => {
    const { name, value } = event.target;
    setNewContrato((prevContrato) => ({
      ...prevContrato,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updateMode) {
      await updateContrato(selectedContratoId, newContrato);
    } else {
      await createContrato(newContrato);
    }
    setOpen(false);
    setNewContrato({
      tipo_contrato: "",
      duracion_jornada: "",
      hora_inicioFin: "",
    });
  };

  const createContrato = async (contrato) => {
    const response = await fetch("/api/contrato", {
      method: "POST",
      body: JSON.stringify(contrato),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New contrato created:", data);
    setDatos([...datos, data]);
  };

  const updateContrato = async (contratoId, contratoData) => {
    const response = await fetch(`/api/contrato/${contratoId}`, {
      method: "PUT",
      body: JSON.stringify(contratoData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedContratos = datos.map((contrato) =>
        contrato._id === contratoId
          ? { ...contrato, ...contratoData }
          : contrato
      );
      setDatos(updatedContratos);
      setSelectedContratoId(null);
      setUpdateMode(false);
    }
  };

  const deleteContrato = async () => {
    if (!selectedContratoId) return;

    const response = await fetch(`/api/contrato/${selectedContratoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedContratos = datos.filter(
        (contrato) => contrato._id !== selectedContratoId
      );
      setDatos(updatedContratos);
      setSelectedContratoId(null);
    }

    setConfirmOpen(false);
  };

  const handleRowClick = (params) => {
    setSelectedContratoId(params.row._id);
    setSelectedContratoData(Object.assign({}, params.row));
    setNewContrato(Object.assign({}, params.row));
  };

  const handleEditClick = () => {
    setUpdateMode(true);
    setOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewContrato((prevContrato) => ({
      ...prevContrato,
      [name]: value,
    }));
  };

  const columns = [
    { field: "tipo_contrato", headerName: "Tipo de contrato", width: 400 },
    {
      field: "duracion_jornada",
      headerName: "Duración de la jornada",
      width: 400,
    },
    { field: "hora_inicioFin", headerName: "Hora de inicio y fin", width: 400 },
  ];

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
        disabled={!selectedContratoId}
      >
        <EditIcon />
      </Fab>
      <Fab
        color="secondary"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh" }}
        disabled={!selectedContratoId}
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
            hideFooter
            slots={{ toolbar: GridToolbar }}
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
          {updateMode ? "Actualizar contrato" : "Registro de contratos"}
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} p={1} rowSpacing={2}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="tipo_contrato"
                required
                label="Tipo de contrato"
                select
                fullWidth
                variant="outlined"
                value={newContrato.tipo_contrato}
                onChange={handleTipoContratoChange}
                sx={{ marginBottom: "16px" }} // Ajusta el espaciado inferior
              >
                <MenuItem value="5d/2d">
                  Trabaja 5 días / Descansa 2 días
                </MenuItem>
                <MenuItem value="1d/2d">
                  Trabaja 1 día / Descansa 2 días
                </MenuItem>
                <MenuItem value="6d/1d">
                  Trabaja 6 días / Descansa 1 día
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="duracion_jornada"
                required
                label="Duración de la jornada"
                fullWidth
                variant="outlined"
                value={newContrato.duracion_jornada}
                onChange={handleChange}
                disabled
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="hora-inicio-fin-label">
                  Hora de inicio y fin
                </InputLabel>
                <Select
                  labelId="hora-inicio-fin-label"
                  id="hora-inicio-fin"
                  name="hora_inicioFin"
                  required
                  value={newContrato.hora_inicioFin}
                  onChange={handleHoraInicioFinChange}
                  label="Hora de inicio y fin"
                >
                  {horasDisponibles.map((hora, index) => (
                    <MenuItem key={index} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          ¿Está seguro de que desea eliminar este contrato?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={deleteContrato} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContratosPage;
