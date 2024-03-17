import Logo from "@/components/logo";
import { Grid } from "@mui/material";
import React from "react";
import NavBar from "@/components/navbar";
import Lienzo from "@/components/lienzo";

const ViewPage = () => {
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
            <Lienzo></Lienzo>
          </Grid>
      </Grid>
    </div>
  );
};

export default ViewPage;
