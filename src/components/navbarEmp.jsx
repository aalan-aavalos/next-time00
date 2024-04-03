"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
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

function NavBarSAdm() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sessionData = session ? session.user : "";
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
        <Link href="/views/emp/turnos" underline="none" color="inherit">
          <h2>Turnos</h2>
        </Link>
        <Link href="/views/emp/vacaciones" underline="none" color="inherit">
          <h2>Vacaciones</h2>
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
        <MenuItem onClick={handleClose}>{sessionData.eNombre}</MenuItem>
        <MenuItem onClick={handleClose}>{sessionData.eCorreo}</MenuItem>
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

export default NavBarSAdm;
