import { createTheme } from "@mui/material";

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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "white",
            backgroundColor: "#2D2D2D",
          },
          textTransform: "none",
          fontFamily: "Raleway, sans-serif",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "18.78px",
        },
      },
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
    body1: {
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "16px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16px",
    },
  },
});

export default MUITheme;
