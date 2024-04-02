import React from "react";
import Box from "@mui/material/Box";

import Image from "next/image";


function LienzoLo({ children }) {
  return (
  
    <Box height={"80vh"} bgcolor={"#2F3D5D"} p={2} sx={{ borderRadius: 3 }}>
      {children}

      <div style={{ display: "flex" }}>
  <Box
    height={"70vh"}
    flexBasis="50%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={4}
    sx={{ borderRadius: 3 }}
  >
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image src="/log.jpg" fill alt="Logo" />
    </div>
  </Box>
  <Box
    height={"70vh"}
    flexBasis="50%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={4}
    sx={{ borderRadius: 3 }}
  >
    <div style={{ position: "relative", width: "100%", height: "50%" }}>
      <Image src="/logo.svg" fill alt="Logo2" />
    </div>
  </Box>
</div>
    </Box>
    
 
  );
}

export default LienzoLo;
