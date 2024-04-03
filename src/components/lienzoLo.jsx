import React from "react";
import Box from "@mui/material/Box";

function LienzoLo({ children }) {
  return (
    <Box height={"80vh"} bgcolor={"#2F3D5D"} p={2} sx={{ borderRadius: 3 }}>
      {children}

      <div style={{ display: "flex" }}>
        <Box
          flexBasis="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          sx={{ borderRadius: 3 }}
        >
          
        </Box>
      </div>
    </Box>
  );
}

export default LienzoLo;
