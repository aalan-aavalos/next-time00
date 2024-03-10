import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";

function Logo() {
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
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image src="/logo.svg" fill alt="Picture of the author" />
      </div>
    </Box>
  );
}

export default Logo;
