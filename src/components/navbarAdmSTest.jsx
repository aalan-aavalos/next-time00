"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  Stack,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, useSession } from "next-auth/react";

function NavBarAdm() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Función para determinar si la ruta actual coincide con la ruta proporcionada
  const isActiveRoute = (href) => currentPath === href;

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
        sx={{ alignItems: "center", fontSize: "3rem" }}
      >
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
          Hola {session?.user?.eNombre}
        </h1>
        <Link
          href="/views/adms/usrs"
          underline="none"
          color={isActiveRoute("/views/adms/usrs") ? "primary" : "inherit"}
          style={{ fontSize: "1.5rem" }}
        >
          Usuarios
        </Link>
        <Link
          href="/views/adms/sede"
          underline="none"
          color={isActiveRoute("/views/adms/sede") ? "primary" : "inherit"}
          style={{ fontSize: "1.5rem" }}
        >
          Sede
        </Link>

        <PersonIcon
          sx={{ fontSize: "3rem", color: "white" }}
          onClick={handleClick}
        />
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          style: {
            background: "#2F3D5D",
          },
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default NavBarAdm;
