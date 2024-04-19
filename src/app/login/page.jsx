"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { genRanPwd } from "@/utils/ramdom";
import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import { signIn, getSession } from "next-auth/react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LienzoLo from "@/components/lienzoLo";

function LoginPage() {
  const router = useRouter();

  const usrsModel = {
    eCorreo: "",
    pwd: "",
  };

  const [newUser, setNewUser] = useState(usrsModel);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState("email"); // Controla qué diálogo se muestra: "email" o "password"
  const [datos, setDatos] = useState();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const respuesta = await fetch("/api/usrs");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const datosJson = await respuesta.json();
        const datosFiltrados = datosJson
          .map((dato) => {
            if (dato.eRol === "emp") {
              return {
                _id: dato._id,
                eNombre: dato.eNombre,
                eCorreo: dato.eCorreo,
                eRol: dato.eRol,
              };
            }
            return null; // Devolvemos null para los elementos que no cumplan la condición
          })
          .filter((dato) => dato !== null); // Filtramos los resultados que no sean null

        setDatos(datosFiltrados);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadUsers();
  }, []);

  const updateUser = async (userId, userData) => {
    const response = await fetch(`/api/usrs/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log(response);
    }
  };

  // console.log(datos);

  const sendEmail = async (dataEmail) => {
    const response = await fetch("/api/send/login", {
      method: "POST",
      body: JSON.stringify(dataEmail),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log("New email sent:", data);
  };

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleOpen = (dialog) => {
    setDialogOpen(dialog);
  };

  const handleClose = () => {
    setDialogOpen(null);
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();

    const existingUser = datos.find((user) => user.eCorreo === newUser.eCorreo);
    if (existingUser) {
      let data = { pwd: "" };
      data.pwd = genRanPwd(4);
      await sendEmail({ ...existingUser, ...data });
      // console.log(data)
      await updateUser(existingUser._id, data);
    }
    setDialogOpen("password"); // Cambia al diálogo de contraseña después de enviar el email
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    await signInM(newUser);
    setNewUser(usrsModel);
  };

  const signInM = async (user) => {
    const res = await signIn("credentials", {
      eCorreo: user.eCorreo,
      pwd: user.pwd,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
      return;
    }
    const session = await getSession();
    if (res.ok && session) {
      if (session.user.eRol === "adm") {
        router.push("/views/adm/usrs");
      } else if (session.user.eRol === "sAdm") {
        router.push("/views/adms/usrs");
      } else {
        router.push("/views/emp/turnos");
      }
    }
  };

  return (
    <div>
      <Grid container spacing={2} p={2}>
        <Grid item xs={4}>
          <Logo></Logo>
        </Grid>
        <Grid item xs={8}>
          <Navbar></Navbar>
        </Grid>
        <Grid item xs={12}>
          <LienzoLo>
            <img
              style={{
                width: "45%",
                height: "95%",
                borderRadius: "50px",
                marginTop: "1vw",
              }}
              src="/log.jpg"
            />
            <DialogTitle alignSelf="center"></DialogTitle>
            <div>
              <div style={{ textAlign: "right", width: "36%", height: "50%" }}>
                <Button
                  variant="contained"
                  onClick={() => handleOpen("email")}
                  style={{
                    backgroundColor: "#93A2B9",
                    borderRadius: "20px",
                    color: "black",
                    marginLeft: "1300px",
                    marginTop: "-12vw",
                    fontSize: "20px", // Tamaño de la letra
                    height: "4vw", // Tamaño del botón
                  }}
                >
                  Ingresar
                </Button>
              </div>
              <Dialog
                open={dialogOpen === "email"}
                onClose={handleClose}
                fullWidth
                PaperProps={{
                  component: "form",
                  onSubmit: handleSubmitEmail,
                  style: {
                    background: "#ffff0000",
                    textAlign: "center",
                    maxWidth: 600,
                    margin: "0 auto",
                    borderRadius: 20,
                    marginLeft: "55vw",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    color: "white",
                  }}
                >
                  Ingresar Email
                </DialogTitle>
                <DialogContent
                  sx={{
                    color: "#ffff",
                  }}
                >
                  <TextField
                    type="email"
                    placeholder="introduce tu correo"
                    name="eCorreo"
                    onChange={handleChange}
                    value={newUser.eCorreo}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Email"
                    background="#ffff0000"
                    style={{ marginBottom: "10px" }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    style={{
                      backgroundColor: "#93A2B9",
                      borderRadius: "20px", // Ajusta el radio según sea necesario
                      color: "#ffffff", // Color de texto
                      marginRight: "10px", // Espacio entre botones
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      backgroundColor: "#93A2B9",
                      borderRadius: "20px", // Ajusta el radio según sea necesario
                      color: "#ffffff", // Color de texto
                      marginRight: "10px", // Espacio entre botones
                    }}
                  >
                    Continuar
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={dialogOpen === "password"}
                onClose={handleClose}
                fullWidth
                PaperProps={{
                  component: "form",
                  onSubmit: handleSubmitPassword,
                  style: {
                    background: "#ffff0000",
                    textAlign: "center",
                    maxWidth: 600,
                    margin: "0 auto",
                    borderRadius: 20,
                    marginLeft: "55vw",
                  },
                }}
              >
                <DialogTitle>Ingresar Contraseña</DialogTitle>
                <DialogContent>
                  <TextField
                    type="password"
                    placeholder="Contraseña"
                    name="pwd"
                    value={newUser.pwd}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Password"
                    style={{ marginBottom: "10px" }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    style={{
                      backgroundColor: "#93A2B9",
                      borderRadius: "20px", // Ajusta el radio según sea necesario
                      color: "#ffffff", // Color de texto
                      marginRight: "10px", // Espacio entre botones
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      backgroundColor: "#93A2B9",
                      borderRadius: "20px", // Ajusta el radio según sea necesario
                      color: "#ffffff", // Color de texto
                      marginRight: "10px", // Espacio entre botones
                    }}
                  >
                    Login
                  </Button>
                  {error && <Typography color="error">{error}</Typography>}
                </DialogActions>
              </Dialog>
            </div>
          </LienzoLo>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;