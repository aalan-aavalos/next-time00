"use client"

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

function NavBarAdm() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Función para determinar si la ruta actual coincide con la ruta proporcionada
  const isActiveRoute = (href) => {
    return currentPath === href;
  };

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
        <Link
          href="/views/adm/area"
          underline="none"
          color={isActiveRoute("/views/adm/area") ? "secondary" : "inherit"}
        >
          <h2>Areas</h2>
        </Link>
        <Link
          href="/views/adm/usrs"
          underline="none"
          color={isActiveRoute("/views/adm/usrs") ? "secondary" : "inherit"}
        >
          <h2>Usuarios</h2>
        </Link>
        <Link
          href="/views/adm/solic"
          underline="none"
          color={isActiveRoute("/views/adm/solic") ? "secondary" : "inherit"}
        >
          <h2>Solicitudes</h2>
        </Link>
        <Link
          href="/views/adm/contrato"
          underline="none"
          color={isActiveRoute("/views/adm/contrato") ? "secondary" : "inherit"}
        >
          <h2>Contratos</h2>
        </Link>
        <PersonIcon
          sx={{ fontSize: "4.5rem", color: "white" }}
          onClick={handleClick}
        />
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem onClick={handleClose}>
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
