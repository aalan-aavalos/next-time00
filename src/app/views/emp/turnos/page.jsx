"use client";

import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { signOut, useSession } from "next-auth/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

const TurnosPage = () => {
  const { data: session, status } = useSession();

  const sessionData = session ? session.user : {};

  const [open, setOpen] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [newTurno, setNewTurno] = useState({
    tipo: "",
    motivo: "",
    correo: "",
    estado: "Pendiente",
    eCorreo: sessionData.eCorreo,
    tipo: "turno",
  });
  const [opcionesContratos, setOpcionesContratos] = useState([]);

  useEffect(() => {
    const loadContratos = async () => {
      try {
        const response = await fetch("/api/contrato");
        if (!response.ok) {
          throw new Error("Error al obtener los contratos");
        }
        const contratosData = await response.json();
        setOpcionesContratos(contratosData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadContratos();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setNewTurno({
      tipo: "",
      motivo: "",
      correo: "",
      estado: "Pendiente",
      eCorreo: sessionData.eCorreo,
      tipo: "turno",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewTurno({ ...newTurno, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTurno(newTurno);
      setOpen(false);
    } catch (error) {
      console.error("Error al solicitar turno:", error);
      // Mostrar mensaje de error al usuario
    }
  };

  const createTurno = async (turno) => {
    const response = await fetch("/api/turnos", {
      method: "POST",
      body: JSON.stringify(turno),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTurnos([...turnos, data]);
  };

  const columns = [
    { field: "tipo", headerName: "Tipo de Turno", width: 200 },
    { field: "motivo", headerName: "Motivo", width: 300 },
    { field: "correo", headerName: "Correo eléctronico", width: 300 },
    { field: "estado", headerName: "Estado", width: 150 },
  ];

  return (
    <div>
      <Fab
        color="dark"
        aria-label="add"
        onClick={handleClickOpen}
        style={{ fontSize: 20, marginBottom: "2vh", marginLeft: "1vw" }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Solicitar Turno</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name="tipo"
              label="Tipo de Turno"
              fullWidth
              select
              value={newTurno.tipo}
              onChange={handleChange}
            >
              {opcionesContratos.map((contrato) => (
                <MenuItem key={contrato._id} value={contrato.tipo_contrato}>
                  {`${contrato.tipo_contrato} - ${contrato.duracion_jornada} - ${contrato.hora_inicioFin}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="motivo"
              label="Motivo"
              fullWidth
              value={newTurno.motivo}
              onChange={handleChange}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" color="primary">
                Solicitar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TurnosPage;
