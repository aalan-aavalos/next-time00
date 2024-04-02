// src/theme.ts
"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#FFFFFF', // Letras blancas
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: '#000000', // Borde negro
        },
      },
    },
  },
});


export default darkTheme;
