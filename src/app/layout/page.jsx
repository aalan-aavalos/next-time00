import { Button, Container, Grid, Paper, Item } from "@mui/material";
import React from "react";

function LayoutPage() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid
          item
          xs={3}
          sx={{
            height: "15vh",
            background: "red",
          }}
          
        ></Grid>
        <Grid
          item
          xs={9}
          sx={{
            height: "15vh",
            background: "green",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: "85vh",
            background: "blue",
          }}
        ></Grid>
      </Grid>
    </div>
  );
}

export default LayoutPage;
