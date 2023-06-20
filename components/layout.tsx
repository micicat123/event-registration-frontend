import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Nav from "./nav";
import { Box, ThemeProvider } from "@mui/material";
import MUITheme from "../conifg/MUI_theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={MUITheme}>
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </>
  );
}
