import React, { SyntheticEvent, useState } from "react";
import Layout from "../../components/layout";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import MUITheme from "../../conifg/MUI_theme";
import Nav from "../../components/nav";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CustomButton,
  CustomTextInput,
} from "../../conifg/MUI_styled_components";
import { UserRegisterStore } from "../../api/registerUser";
import { useRouter } from "next/router";
import Footer from "../../components/footer";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const register = async (e: SyntheticEvent, file: any) => {
    e.preventDefault();
    const userReisterStore = new UserRegisterStore();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      const userData = await userReisterStore.register(
        email,
        password,
        passwordConfirm,
        firstName,
        lastName
      );
      if (file != null) {
        userReisterStore.postUserPicture(formData, userData.user.uid);
      }
      setOpen(true);
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        setErrorMessage(err.response.data.message[0]);
      else setErrorMessage(err.response.data.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Layout>
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Verify Your Email Address"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              An email has been sent to your email address. Please verify your
              email before you can proceed with login.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton onClick={() => router.push("/login")} autoFocus>
              Ok
            </CustomButton>
          </DialogActions>
        </Dialog>
      </div>

      <Box sx={{ backgroundColor: MUITheme.palette.secondary.main }}>
        <Nav />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "488px",
            pt: "8.5rem",
            ml: "auto",
            mr: "auto",
          }}
        >
          <Typography color="primary" variant="h2">
            Hello!
          </Typography>
          <Typography
            color="textPrimary"
            variant="h6"
            sx={{ fontSize: "20px", lineHeight: "30px" }}
          >
            Get started with your free account today.
          </Typography>

          <form onSubmit={(e: SyntheticEvent) => register(e, file)}>
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                id="files"
                style={{ display: "none" }}
              />
              <label
                htmlFor="files"
                style={{
                  display: "block",
                  width: "64px",
                  height: "64px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "1rem",
                }}
              >
                <Avatar
                  src={previewImage}
                  alt="upload profile picture"
                  sx={{
                    width: "64px",
                    height: "64px",
                    marginTop: "0.75rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </label>
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FormControl
                sx={{ display: "flex", flexDirection: "row", gap: "5%" }}
              >
                <CustomTextInput
                  label="First Name"
                  autoComplete="first-name"
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstName(e.target.value);
                  }}
                  sx={{
                    width: "47.5%",
                  }}
                  required
                />
                <CustomTextInput
                  label="Last Name"
                  autoComplete="last-name"
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLastName(e.target.value);
                  }}
                  sx={{
                    width: "47.5%",
                  }}
                  required
                />
              </FormControl>
              <br />

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
              <br />

              <FormControl variant="outlined" sx={{ display: "block" }}>
                <CustomTextInput
                  label="Confirm Password"
                  autoComplete="password"
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordConfirm(e.target.value);
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

                <FormHelperText sx={{ color: "red" }}>
                  {errorMessage}
                </FormHelperText>
              </FormControl>
              <br />

              <CustomButton
                variant="contained"
                type="submit"
                sx={{
                  borderRadius: "64px",
                  height: "45px",
                  width: "100%",
                }}
              >
                Sign up
              </CustomButton>
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
                  Already have an account?
                </Typography>
                <Typography variant="body1" color={"primary"}>
                  <Link
                    href={"/login"}
                    underline="none"
                    sx={{ fontWeight: 500 }}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <Footer />
    </Layout>
  );
}
