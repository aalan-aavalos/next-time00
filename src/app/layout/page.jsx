import { Box, Grid } from "@mui/material";
import React from "react";

function LayoutPage() {
  return (
    <div>
      <Grid container columnSpacing={1} rowSpacing={1} p={1}>
        <Grid item>
          <Box
            height={"50vh"}
            width={"50vh"}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px solid grey" }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
        </Grid>
        <Grid item>
          <Box
            height={"50vh"}
            width={"50vh"}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px solid grey" }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
        </Grid>
        <Grid item>
          <Box
            height={"50vh"}
            width={"50vh"}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px solid grey" }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
        </Grid>
        <Grid item>
          <Box
            height={"50vh"}
            width={"50vh"}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px solid grey" }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
        </Grid>
        <Grid item>
          <Box
            height={"50vh"}
            width={"50vh"}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px solid grey" }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
        </Grid>
        <Grid item>
          <Box
            height={"50vh"}
            width={"50vh"}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px solid grey" }}
          >
            This Box uses MUI System props for quick customization.
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LayoutPage;
