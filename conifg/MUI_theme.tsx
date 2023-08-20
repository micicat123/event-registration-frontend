import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const MUITheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1050,
      lg: 1390,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#2F3C7E",
    },
    secondary: {
      main: "#FBEAEB",
    },
    text: {
      primary: "#2D2D2D",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: "64px",
      fontWeight: 600,
      lineHeight: "76px",
    },
    h2: {
      fontSize: "48px",
      fontWeight: 500,
      lineHeight: "56px",
    },
    h3: {
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: "36px",
    },
    h4: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    h5: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "30px",
    },
    h6: {
      fontWeight: 550,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "-2%",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "16px",
    },
    body2: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "27px",
    },
  },
});

export default MUITheme;
