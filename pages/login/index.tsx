import React, { SyntheticEvent, useState } from "react";
import Layout from "../../components/layout";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import MUITheme from "../../conifg/MUI_theme";
import Nav from "../../components/nav";
import { CustomTextInput } from "../../conifg/MUI_styled_components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UserLoginLogoutStore } from "../../api/loginLogoutUser";
import Footer from "../../components/footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const register = async (e: SyntheticEvent) => {
    e.preventDefault();
    const userLoginStore = new UserLoginLogoutStore();

    try {
      await userLoginStore.login(email, password);

      router.push("/");
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        setErrorMessage(err.response.data.message[0]);
      else setErrorMessage(err.response.data.message);
    }
  };

  return (
    <Layout>
      <Box sx={{ backgroundColor: MUITheme.palette.secondary.main }}>
        <Nav />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "488px",
            ml: "auto",
            mr: "auto",
            pt: "12rem",
            pb: "10em",
          }}
        >
          <Typography color="primary" variant="h2">
            Welcome back!
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
            sx={{ pt: "8px", pb: "35px" }}
          >
            We are glad that you are back.
          </Typography>

          <form onSubmit={(e: SyntheticEvent) => register(e)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ display: "block" }}>
                <CustomTextInput
                  label="Email"
                  autoComplete="email"
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  required
                />
              </FormControl>
              <br />

              <FormControl variant="outlined" sx={{ display: "block" }}>
                <CustomTextInput
                  label="Password"
                  autoComplete="password"
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  required
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl sx={{ display: "block" }}>
                <FormHelperText sx={{ color: "red" }}>
                  {errorMessage}
                </FormHelperText>
              </FormControl>
              <br />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  borderRadius: "64px",
                  height: "45px",
                  width: "100%",
                }}
              >
                Login
              </Button>
              <br />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "5rem",
                }}
              >
                <Typography variant="body1" color={"textPrimary"}>
                  Don’t have an account yet?
                </Typography>
                <Typography variant="body1" color={"primary"}>
                  <Link
                    href={"/login"}
                    underline="none"
                    sx={{ fontWeight: 500 }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
        <Footer />
      </Box>
    </Layout>
  );
}
