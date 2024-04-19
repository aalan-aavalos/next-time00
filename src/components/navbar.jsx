"use client";
import Modal from "@mui/material/Modal";

import React, { useState } from "react";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      height={"15vh"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      bgcolor={"#2f3d5d"}
      p={2}
      sx={{ borderRadius: 3 }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={5}
      >
        <Link
          underline="none"
          color="inherit"
          onClick={() =>
            handleOpenModal(
              "Nuestra misión es proporcionar una plataforma eficiente y transparente para la gestión de horarios y vacaciones de nuestros empleados en una variedad de sedes y áreas de trabajo. Nos comprometemos a facilitar un proceso justo y equitativo para la asignación de turnos, asegurando el cumplimiento de los contratos laborales y respetando las necesidades individuales de cada empleado. Con un enfoque en la automatización y la facilidad de uso, buscamos simplificar la administración de recursos humanos y mejorar la experiencia laboral de nuestros empleados."
            )
          }
        >
          <h2>Misión</h2>
        </Link>
        <Link
          underline="none"
          color="inherit"
          onClick={() =>
            handleOpenModal(
              "Nuestra visión es ser la principal solución tecnológica para la gestión de horarios y vacaciones, reconocida por su eficiencia, precisión y adaptabilidad. Nos esforzamos por ser líderes en innovación en la optimización de la fuerza laboral, ofreciendo herramientas avanzadas de planificación y programación que se ajusten dinámicamente a las necesidades cambiantes de la empresa y de sus empleados."
            )
          }
        >
          <h2>Visión</h2>
        </Link>
        <Link
          underline="none"
          color="inherit"
          onClick={() =>
            handleOpenModal(
              "Somos una empresa dedicada a desarrollar soluciones tecnológicas avanzadas para la gestión de recursos humanos, con un enfoque particular en la optimización de horarios y la planificación de vacaciones."
            )
          }
        >
          <h2>Sobre Nosotros</h2>
        </Link>
        
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
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#0000",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: "46vw",
          }}
        >
          <p id="modal-description">{modalContent}</p>
        </Box>
      </Modal>
    </Box>
  );
}

export default NavBarSAdm;
