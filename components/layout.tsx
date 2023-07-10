import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Nav from "./nav";
import { Box, ThemeProvider } from "@mui/material";
import MUITheme from "../conifg/MUI_theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={MUITheme}>
          <main>{children}</main>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}
