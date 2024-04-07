// src/theme.ts
"use client";
import { createTheme } from "@mui/material/styles";


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
