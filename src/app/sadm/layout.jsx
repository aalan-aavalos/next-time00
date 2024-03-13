import Lienzo from "@/components/lienzo";
import Logo from "@/components/logo";
import NavBarSAdm from "@/components/navbarSAdm";
import { Grid } from "@mui/material";

export default function AdminLayout({ children }) {
  return (
    <>
      <div style={{ background: "#93A2B9" }}>
        <Grid container columnSpacing={2} rowSpacing={2} p={2}>
          <Grid item xs={3}>
            <Logo />
          </Grid>
          <Grid item xs={9}>
            <NavBarSAdm />
          </Grid>
          <Grid item xs={12}>
            <Lienzo>{children}</Lienzo>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
