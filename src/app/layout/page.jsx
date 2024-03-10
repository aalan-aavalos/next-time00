import { Grid, Button } from "@mui/material";
import React from "react";

import Logo from "@/components/logo";
import NavBar from "@/components/navbar";
import Lienzo from "@/components/lienzo";

function LayoutPage() {
  return (
    <div style={{ background: "#93A2B9" }}>
      <Grid container columnSpacing={2} rowSpacing={2} p={2}>
        <Grid item xs={3}>
          <Logo />
        </Grid>
        <Grid item xs={9}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Lienzo>
            <Button variant="contained">Agrear</Button>
          </Lienzo>
        </Grid>
      </Grid>
    </div>
  );
}

export default LayoutPage;
