import React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Link } from "@mui/material";

function NavBar() {
  return (
    <Box
      height={"15vh"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      bgcolor={"#2F3D5D"}
      p={2}
      sx={{ borderRadius: 3 }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={5}
      >
        <Link href="/sede" underline="none" color="inherit">
          <h2>Agregar Sedes</h2>
        </Link>
        <Link href="/usrs" underline="none" color="inherit">
          <h2>Usuarios</h2>
        </Link>
        <Link href="/solic" underline="none" color="inherit">
          <h2>Solicitudes</h2>
        </Link>
        <Link href="/train" underline="none" color="inherit">
          <h2>Training</h2>
        </Link>
      </Stack>
    </Box>
  );
}

export default NavBar;
