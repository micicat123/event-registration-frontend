import { Box, Hidden, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "63px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        bottom: 0,
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
        px: 10,
        backgroundColor: "white",
      }}
    >
      <Hidden smDown>
        <Box>
          <img src="/pictures/logo-big.png" alt="logo" className="logo" />
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box>
          <img
            src="/pictures/logo-small.png"
            alt="logo"
            className="logo"
            width={24}
          />
        </Box>
      </Hidden>

      <Typography color="primary" variant="body1">
        All Rights Reserved | skillupmentor.com
      </Typography>
    </Box>
  );
}
