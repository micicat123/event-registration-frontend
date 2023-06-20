import React from "react";
import Layout from "../components/layout";
import Nav from "../components/nav";
import { Box, Typography } from "@mui/material";
import { FlexBox } from "../conifg/MUI_styled_components";
import MUITheme from "../conifg/MUI_theme";

export default function Page() {
  return (
    <Layout>
      <Box>
        <Nav />
        <FlexBox>
          <Box
            width="81.5%"
            sx={{
              backgroundColor: MUITheme.palette.secondary.main,
              pt: "8rem",
              pl: 5,
            }}
          >
            <Typography
              color="textPrimary"
              variant="body1"
              sx={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-2%",
              }}
            >
              FIND THE BEST EVENTS
            </Typography>
            <Typography
              color="primary"
              variant="h1"
              sx={{
                lineHeight: "64px",
                maxWidth: "508px",
              }}
            >
              Are you looking for your next event?
            </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
              sx={{
                maxWidth: "488px",
              }}
            >
              Aliquet sed iaculis posuere egestas integer. Lectus morbi lectus
              consequat, massa etiam a sed in. Sollicitudin id dignissim
              tincidunt ipsum vel morbi diam ultricies fermentum.
            </Typography>
          </Box>
          <Box
            width="18.5%"
            sx={{
              backgroundImage: `url("pictures/background-logo.png")`,
            }}
          >
            world
          </Box>
        </FlexBox>
      </Box>
    </Layout>
  );
}
