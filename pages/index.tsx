import React from "react";
import Layout from "../components/layout";
import Nav from "../components/nav";
import { Box, Typography } from "@mui/material";
import MUITheme from "../conifg/MUI_theme";
import Searchbar from "../components/searchbar";
import Footer from "../components/footer";
import Draggable from "react-draggable";

export default function Page() {
  return (
    <Layout>
      <Box>
        <Nav />
        <Box sx={{ display: "flex" }}>
          <Box
            width="81.5%"
            sx={{
              backgroundColor: MUITheme.palette.secondary.main,
              py: "8rem",
              pl: 10,
            }}
          >
            <Typography color="textPrimary" variant="h6">
              FIND THE BEST EVENTS
            </Typography>
            <Typography
              color="primary"
              variant="h1"
              sx={{
                lineHeight: "64px",
                maxWidth: "508px",
                mt: "18px",
                mb: "35px",
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

            <Typography
              color="textPrimary"
              variant="h6"
              sx={{ mt: "59px", mb: "5px" }}
            >
              FIND YOUR NEXT EVENT
            </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
              sx={{
                mb: "20px",
              }}
            >
              Sollicitudin id dignissim tincidunt ipsum vel morbi diam ultricies
              fermentum.
            </Typography>
            <Searchbar />
          </Box>
          <Box
            width="18.5%"
            sx={{
              backgroundImage: `url("pictures/background-logo.png")`,
              py: "8rem",
            }}
          />

          <Box
            sx={{
              width: "950px",
              overflow: "hidden",
              mt: "8rem",
              ml: "-45rem",
            }}
          >
            <Draggable axis="x">
              <Box
                sx={{
                  height: "694px",
                  gap: 2,
                  display: "flex",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "454px",
                    height: "100%",
                    maxHeight: "694px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                  src="/pictures/landing-page-slideshow/first.jpg"
                  draggable={false}
                />
                <Box
                  component="img"
                  sx={{
                    width: "454px",
                    height: "100%",
                    maxHeight: "694px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                  src="/pictures/landing-page-slideshow/second.jpg"
                  draggable={false}
                />
                <Box
                  component="img"
                  sx={{
                    width: "454px",
                    height: "100%",
                    maxHeight: "694px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                  src="/pictures/landing-page-slideshow/third.jpg"
                  draggable={false}
                />
                <Box
                  component="img"
                  sx={{
                    width: "454px",
                    height: "100%",
                    maxHeight: "694px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                  src="/pictures/landing-page-slideshow/fourth.jpg"
                  draggable={false}
                />
              </Box>
            </Draggable>
          </Box>
        </Box>
        <Box sx={{ maxWidth: "43rem", mt: "-95px" }}>
          <Footer />
        </Box>
      </Box>
    </Layout>
  );
}
