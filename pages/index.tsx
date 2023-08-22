import React from "react";
import Layout from "../components/layout";
import Nav from "../components/nav";
import { Box, Hidden, Typography } from "@mui/material";
import MUITheme from "../conifg/MUI_theme";
import Searchbar from "../components/searchbar";
import Footer from "../components/footer";
import Draggable from "react-draggable";

export default function Page() {
  return (
    <Layout>
      <Box>
        <Nav />
        <Hidden mdUp>
          <Box
            sx={{
              width: "98.2vw",
              overflow: "hidden",
              pt: 10,
            }}
          >
            <Draggable
              axis="x"
              bounds={{
                left: -650,
                right: 0,
              }}
            >
              <Box
                sx={{
                  height: "625px",
                  gap: 2,
                  display: "flex",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "338px",
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
        </Hidden>

        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              backgroundColor: MUITheme.palette.secondary.main,
              pt: { sm: "1rem", md: "8rem" },
              pb: "8rem",
              pl: { xs: 4, sm: 10 },
              pr: { xs: 4, sm: 10 },
              width: "100%",
            }}
          >
            <Box sx={{ width: { md: "50%", lg: "100%" } }}>
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
                Sollicitudin id dignissim tincidunt ipsum vel morbi diam
                ultricies fermentum.
              </Typography>
              <Box sx={{ width: { sm: "100%", md: "86.5%" } }}>
                <Searchbar />
              </Box>
            </Box>
          </Box>
          <Hidden mdDown>
            <Box
              width="18.5%"
              sx={{
                backgroundImage: `url("pictures/background-logo.png")`,
                py: "8rem",
              }}
            />
          </Hidden>
          <Hidden mdDown>
            <Box
              sx={{
                width: "52.5%",
                overflow: "hidden",
                position: "fixed",
                bottom: 0,
                left: "47.5%",
                mt: "8rem",
              }}
            >
              <Draggable
                axis="x"
                bounds={{
                  left: -842,
                  right: 0,
                }}
              >
                <Box
                  sx={{
                    height: "625px",
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
          </Hidden>
        </Box>
      </Box>
      <Box sx={{ width: { md: "47.5%", xl: "100%" }, mt: "-85px" }}>
        <Footer />
      </Box>
    </Layout>
  );
}
