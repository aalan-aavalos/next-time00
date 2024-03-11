"use client";

import React from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  Stack,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  MenuList,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Link href="/adm/sede" underline="none" color="inherit">
          <h2>Agregar Sedes</h2>
        </Link>
        <Link href="/adm/usrs" underline="none" color="inherit">
          <h2>Usuarios</h2>
        </Link>
        <Link href="/adm/solic" underline="none" color="inherit">
          <h2>Solicitudes</h2>
        </Link>
        <Link href="/adm/train" underline="none" color="inherit">
          <h2>Training</h2>
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

export default NavBar;
