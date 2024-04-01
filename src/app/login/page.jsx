"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Lienzo from "@/components/lienzo";
import Logo from "@/components/logo";
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

function LoginPage() {
  const router = useRouter();

  const usrsModel = {
    eCorreo: "",
    pwd: "",
  };

  const [newUser, setNewUser] = useState(usrsModel);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState("email"); // Controla qué diálogo se muestra: "email" o "password"

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
        <Grid item xs={12}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Lienzo>
            <DialogTitle alignSelf="center"></DialogTitle>
            <div>
              <Button
                variant="contained"
                onClick={() => handleOpen("email")}
                style={{
                  backgroundColor: "#93A2B9",
                  borderRadius: "20px", // Ajusta el radio según sea necesario
                  color: "black", // Color de texto
                  marginRight: "10px", // Espacio entre botones
                }}
              >
                Registrarse
              </Button>
              <Dialog
                open={dialogOpen === "email"}
                onClose={handleClose}
                fullWidth
                PaperProps={{
                  component: "form",
                  onSubmit: handleSubmitEmail,
                  style: {
                    background: "#ffff",
                    textAlign: "center",
                    maxWidth: 600,
                    margin: "0 auto",
                    borderRadius: 20,
                  },
                }}
              >
                <DialogTitle>
                  <Typography variant="h4" style={{ color: "black" }}>
                    Ingresar Email
                  </Typography>
                </DialogTitle>
                <DialogContent>
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
                    background: "#ffff",
                    textAlign: "center",
                    maxWidth: 600,
                    margin: "0 auto",
                    borderRadius: 20,
                  },
                }}
              >
                <DialogTitle>
                  <Typography variant="h4" style={{ color: "black" }}>
                    Ingresar Contraseña
                  </Typography>
                </DialogTitle>
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
          </Lienzo>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;
