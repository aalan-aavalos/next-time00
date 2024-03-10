import React from "react";
import Box from "@mui/material/Box";

function Lienzo({ children }) {
  return (
    <Box height={"80vh"} bgcolor={"#2F3D5D"} p={2} sx={{ borderRadius: 3 }}>
      {children}
    </Box>
  );
}

export default Lienzo;
