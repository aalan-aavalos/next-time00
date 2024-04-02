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
  MenuItem,
  TextField,
} from "@mui/material";

const AreasPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [newArea, setNewArea] = useState({
    tipoArea: "",
    aNombre: "",
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedAreaData, setSelectedAreaData] = useState(null);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const respuesta = await fetch("/api/areas");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        setDatos(datosJson);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadAreas();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateMode(false);
    setNewArea({ aNombre: "", tipoArea: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setNewArea({ aNombre: "", tipoArea: "" });
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleChange = (event) => {
    setNewArea({ ...newArea, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updateMode) {
      await updateArea(selectedAreaId, newArea);
    } else {
      await createArea(newArea);
    }
    setOpen(false);
    setNewArea({ tipoArea: "", aNombre: "" });
  };

  const createArea = async (area) => {
    const response = await fetch("/api/areas", {
      method: "POST",
      body: JSON.stringify(area),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("New area created:", data);
    setDatos([...datos, data]);
  };

  const updateArea = async (areaId, areaData) => {
    const response = await fetch(`/api/areas/${areaId}`, {
      method: "PUT",
      body: JSON.stringify(areaData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedAreas = datos.map((area) =>
        area._id === areaId ? { ...area, ...areaData } : area
      );
      setDatos(updatedAreas);
      setSelectedAreaId(null);
      setUpdateMode(false);
    }
  };

  const deleteArea = async () => {
    if (!selectedAreaId) return;

    const response = await fetch(`/api/areas/${selectedAreaId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedAreas = datos.filter((area) => area._id !== selectedAreaId);
      setDatos(updatedAreas);
      setSelectedAreaId(null);
    }

    setConfirmOpen(false);
  };

  const handleRowClick = (params) => {
    setSelectedAreaId(params.row._id);
    setSelectedAreaData(Object.assign({}, params.row));
    setNewArea(Object.assign({}, params.row));
  };

  const handleEditClick = () => {
    setUpdateMode(true);
    setOpen(true);
  };

  const columns = [
    { field: "aNombre", headerName: "Nombre del area", width: 400 },
    { field: "tipoArea", headerName: "Tipo Área", width: 400 },
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
        disabled={!selectedAreaId}
      >
        <EditIcon />
      </Fab>
      <Fab
        color="secondary"
        aria-label="delete"
        onClick={handleConfirmOpen}
        p={1}
        style={{ fontSize: 20, marginBottom: "2vh" }}
        disabled={!selectedAreaId}
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
          {updateMode ? "Actualizar area" : "Registro de areas"}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            columnSpacing={1}
            p={1}
            rowSpacing={2}
          >
            
            <Grid item xs={4}>
              <TextField
                autoFocus
                name="tipoArea"
                required
                label="Tipo de Área"
                type="text"
                fullWidth
                variant="outlined"
                value={newArea.tipoArea}
                select
                onChange={handleChange}
              >
                <MenuItem value={"Administrativo"}>Administrativo</MenuItem>
                <MenuItem value={"Área"}>Área</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                autoFocus
                name="aNombre"
                required
                label="Área"
                type="text"
                fullWidth
                variant="outlined"
                value={newArea.aNombre}
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
          ¿Está seguro de que desea eliminar esta area?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={deleteArea} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AreasPage;
