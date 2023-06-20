import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";

const FlexBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CustomTextInput = styled(TextField)({
  backgroundColor: "white",
  borderRadius: "16px",
  color: "textPrimary",
  "& .MuiInputLabel-root": {
    marginLeft: "15px",
  },
  "& .MuiInputBase-root": {
    paddingLeft: "15px",
  },
  "& .MuiInputAdornment-positionEnd": {
    marginRight: "15px",
  },
  "& .MuiInput-underline:before": {
    borderBottomWidth: "0px",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  "& .MuiInput-underline:after": {
    borderBottomWidth: "0px",
  },
});

export { FlexBox, CustomTextInput };
