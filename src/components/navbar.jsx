import React from "react";
import Box from "@mui/material/Box";

function NavBar() {
  return (
    <Box
      height={"15vh"}
      display="flex"
      alignItems="center"
      bgcolor={"#2F3D5D"}
      justifyContent={"center"}
      p={2}
      sx={{ borderRadius: 3 }}
    ></Box>
  );
}

export default NavBar;
