import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MUITheme from "../conifg/MUI_theme";
import ShortTextIcon from "@mui/icons-material/ShortText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton, FlexBox } from "../conifg/MUI_styled_components";
import { GetUserStore } from "../api/getUser";
import { useRouter } from "next/router";
import { UserLoginLogoutStore } from "../api/loginLogoutUser";

export default function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const userStore = new GetUserStore();
      try {
        const userData = await userStore.getUser();
        if (userData) {
          setUserDisplayName(userData.user.displayName);

          try {
            const userImage: any = await userStore.getUserPicture();
            setUserPhoto(userImage);
          } catch (err) {}
        }
      } catch (err) {}
    })();
  }, []);

  const logout = async () => {
    const logoutStore = new UserLoginLogoutStore();
    await logoutStore.logout();
  };

  //user is not logged in
  if (userPhoto == "") {
    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "absolute",
          px: 10,
        }}
      >
        <Container disableGutters maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <img
                  src="/pictures/logo-small.png"
                  alt="logo"
                  className="logo"
                />
              </Box>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ p: 0 }}
              >
                <ShortTextIcon
                  color="primary"
                  sx={{ transform: "scaleX(-1)" }}
                  fontSize="large"
                />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuList
                  sx={{
                    backgroundColor: MUITheme.palette.secondary.main,
                    width: "414px",
                    pt: "42px",
                    pb: "28px",
                    px: 2,
                  }}
                >
                  <FlexBox sx={{ p: "6px 16px" }}>
                    <CloseIcon
                      color="primary"
                      onClick={handleCloseNavMenu}
                      sx={{ ml: "auto", cursor: "pointer" }}
                    />
                  </FlexBox>
                  <br />

                  <Link href="/" sx={{ textDecoration: "none" }}>
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography
                        textAlign="center"
                        color="primary"
                        variant="h5"
                      >
                        Home
                      </Typography>
                      <ArrowForwardIosIcon color="primary" />
                    </MenuItem>
                  </Link>

                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push({
                        pathname: "/search",
                        query: { events: JSON.stringify("") },
                      });
                    }}
                    sx={{
                      justifyContent: "space-between",
                      mt: "8px",
                      mb: "20px",
                    }}
                  >
                    <Typography textAlign="center" color="primary" variant="h5">
                      Search
                    </Typography>
                    <ArrowForwardIosIcon color="primary" />
                  </MenuItem>

                  <Link href="/login" sx={{ textDecoration: "none" }}>
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      sx={{
                        justifyContent: "center",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <CustomButton
                        variant="contained"
                        sx={{
                          borderRadius: "32px",
                          height: "40px",
                          width: "344px",
                        }}
                        onClick={handleCloseNavMenu}
                      >
                        Login
                      </CustomButton>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link href="/">
                <img
                  src="/pictures/logo-small.png"
                  alt="logo"
                  className="logo"
                  width="40px"
                  height="42px"
                />
              </Link>

              <FlexBox sx={{ gap: 5 }}>
                <Link href="/" sx={{ textDecoration: "none" }}>
                  <Typography
                    textAlign="center"
                    color="textPrimary"
                    variant="h4"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Home
                  </Typography>
                </Link>

                <Typography
                  textAlign="center"
                  color="textPrimary"
                  variant="h4"
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push({
                      pathname: "/search",
                      query: { events: JSON.stringify("") },
                    });
                  }}
                  sx={{ my: 2, display: "block" }}
                >
                  Search
                </Typography>
              </FlexBox>

              <FlexBox sx={{ gap: 5 }}>
                <Link href="/login" sx={{ textDecoration: "none" }}>
                  <Typography
                    textAlign="center"
                    color="textPrimary"
                    variant="h4"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Login
                  </Typography>
                </Link>

                <Link href="/register">
                  <CustomButton
                    variant="contained"
                    sx={{
                      borderRadius: "64px",
                      height: "45px",
                      width: "122px",
                    }}
                    onClick={handleCloseNavMenu}
                  >
                    Sign up
                  </CustomButton>
                </Link>
              </FlexBox>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  //user is logged in
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        position: "absolute",
        px: 10,
      }}
    >
      <Container disableGutters maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Link href="/">
              <img src="/pictures/logo-small.png" alt="logo" className="logo" />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ p: 0 }}
            >
              <ShortTextIcon
                color="primary"
                sx={{ transform: "scaleX(-1)" }}
                fontSize="large"
              />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuList
                sx={{
                  backgroundColor: MUITheme.palette.secondary.main,
                  width: "414px",
                  pt: "42px",
                  pb: "22px",
                  px: 2,
                }}
              >
                <FlexBox sx={{ p: "6px 16px" }}>
                  <CloseIcon
                    color="primary"
                    onClick={handleCloseNavMenu}
                    sx={{ ml: "auto", cursor: "pointer" }}
                  />
                </FlexBox>
                <br />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    p: "6px 16px",
                    mb: "38px",
                  }}
                >
                  <Link href="/profile">
                    <Avatar src={userPhoto} sx={{ width: 48, height: 48 }} />
                  </Link>
                  <Link href="/profile" sx={{ textDecoration: "none" }}>
                    <Typography textAlign="center" color="primary" variant="h5">
                      {userDisplayName}
                    </Typography>
                  </Link>
                </Box>

                <Link href="/" sx={{ textDecoration: "none" }}>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography textAlign="center" color="primary" variant="h5">
                      Home
                    </Typography>
                    <ArrowForwardIosIcon color="primary" />
                  </MenuItem>
                </Link>

                <MenuItem
                  sx={{
                    justifyContent: "space-between",
                    mt: "8px",
                    mb: "8px",
                  }}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push({
                      pathname: "/search",
                      query: { events: JSON.stringify("") },
                    });
                  }}
                >
                  <Typography textAlign="center" color="primary" variant="h5">
                    Search
                  </Typography>
                  <ArrowForwardIosIcon color="primary" />
                </MenuItem>

                <Link href="/manage-event" sx={{ textDecoration: "none" }}>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{
                      justifyContent: "space-between",
                      mt: "8px",
                      mb: "8px",
                    }}
                  >
                    <Typography textAlign="center" color="primary" variant="h5">
                      Event manager
                    </Typography>
                    <ArrowForwardIosIcon color="primary" />
                  </MenuItem>
                </Link>

                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    logout();
                  }}
                  sx={{
                    justifyContent: "space-between",
                    mt: "8px",
                  }}
                >
                  <Typography
                    textAlign="center"
                    color="textPrimary"
                    variant="h5"
                  >
                    Logout
                  </Typography>
                  <ArrowForwardIosIcon />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <img
                src="/pictures/logo-small.png"
                alt="logo"
                className="logo"
                width="40px"
                height="42px"
              />
            </Link>

            <FlexBox sx={{ gap: 5 }}>
              <Link href="/" sx={{ textDecoration: "none" }}>
                <Typography
                  textAlign="center"
                  color="textPrimary"
                  variant="h4"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Home
                </Typography>
              </Link>

              <Typography
                textAlign="center"
                color="textPrimary"
                variant="h4"
                onClick={() => {
                  handleCloseNavMenu();
                  router.push({
                    pathname: "/search",
                    query: { events: JSON.stringify("") },
                  });
                }}
                sx={{ my: 2, display: "block" }}
              >
                Search
              </Typography>

              <Link href="/manage-event" sx={{ textDecoration: "none" }}>
                <Typography
                  textAlign="center"
                  color="textPrimary"
                  variant="h4"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Event manager
                </Typography>
              </Link>
            </FlexBox>

            <FlexBox sx={{ gap: 2 }}>
              <Typography
                textAlign="center"
                color="textPrimary"
                variant="h4"
                onClick={() => {
                  handleCloseNavMenu();
                  logout();
                }}
                sx={{ my: 2, display: "block" }}
              >
                Logout
              </Typography>
              <Link href="/profile" sx={{ textDecoration: "none" }}>
                <Avatar src={userPhoto} />
              </Link>
            </FlexBox>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
