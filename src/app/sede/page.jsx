"use client";

import {
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
} from "@mui/material";
import React from "react";

import Logo from "@/components/logo";
import NavBarAdm from "@/components/navbarAdm";
import Lienzo from "@/components/lienzo";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

function SedePage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80, fontSize: 90 },
    { field: "ubicacion", headerName: "Ubicacion", width: 400 },
    {
      field: "fecharegistro",
      headerName: "Fecha de Registro",
      type: "date",
      width: 400,
    },
    {
      field: "administradores",
      headerName: "Administradores",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 400,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [];

  return (
    <div style={{ background: "#93A2B9" }}>
      <Grid container columnSpacing={2} rowSpacing={2} p={2}>
        <Grid item xs={3}>
          <Logo />
        </Grid>
        <Grid item xs={9}>
          <NavBarAdm />
        </Grid>
        <Grid item xs={12} style={{ fontSize: 20 }}>
          <Lienzo>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  background: "#93A2B9",
                },
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleClose();
                },
              }}
            >
              <DialogTitle style={{ textAlign: "center" }}>
                Registrar Sede
              </DialogTitle>
              <DialogContent style={{ fontSize: 50 }}>
                <Fragment>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nombreSede"
                    name="nombreSede"
                    label="Nombre de la Sede"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    margin="dense"
                    id="ubicacion"
                    name="ubicacion"
                    label="Ubicación"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    margin="dense"
                    id="fechregistro"
                    name="fechregistro"
                    label="Fecha de Registro"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                  />
                </Fragment>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="contained" type="submit">
                  Agregar
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Fab
                  color="dark"
                  aria-label="add"
                  onClick={handleClickOpen}
                  style={{ marginTop: "2px", fontSize: 20, margin: "30px" }}
                >
                  <AddIcon />
                </Fab>
              </Grid>

              <Grid item>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Nombre de la sede"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <div></div>

            <div
              style={{
                height: "52vh",
                width: "100%",
                marginTop: "4hv",
                fontSize: 500,
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                style={{ fontSize: 20 }}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </Lienzo>
        </Grid>
      </Grid>
    </div>
  );
}

export default SedePage;
