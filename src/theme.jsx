// src/theme.ts
"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#93A2B9",
      paper: "#2F3D5D",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(22,19,19,0.7)",
      hint: "#eeedf3",
    },
    info: {
      main: "#D8DFE9",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
