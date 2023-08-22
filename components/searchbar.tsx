import { Box, Button, Hidden, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  CustomButton,
  CustomTextInput,
  FlexBox,
} from "../conifg/MUI_styled_components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { DatePicker } from "@mui/x-date-pickers";
import MUITheme from "../conifg/MUI_theme";
import { useRouter } from "next/router";
import { GetEventsStore } from "../api/getEvents";
import dayjs from "dayjs";

export default function Searchbar() {
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  const search = async () => {
    const getSearchedEventsStore = new GetEventsStore();
    const events = await getSearchedEventsStore.getSearchedEvents(
      location,
      date
    );
    if (router.pathname === "/search") {
      router.replace({
        pathname: "/search",
        query: { events: JSON.stringify(events) },
      });
    } else {
      router.push({
        pathname: "/search",
        query: { events: JSON.stringify(events) },
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: { xs: "106px", sm: "106px", md: "106px", lg: "44px" },
          backgroundColor: "white",
          borderRadius: { xs: "32px", sm: "32px", md: "32px", lg: "16px" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Box
          sx={{
            gap: { md: 0, lg: 15 },
            mt: { xs: -5, sm: -5, md: -5, lg: 0 },
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FlexBox>
            <LocationOnIcon
              color="primary"
              sx={{ ml: 5, mr: { md: 0, lg: 3 } }}
            />

            <CustomTextInput
              placeholder="Search by location"
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocation(e.target.value);
              }}
            />
          </FlexBox>
          <Hidden lgDown>
            <hr style={{ height: "42px", opacity: "50%" }} />
          </Hidden>
          <Box sx={{ pl: { md: 2.25, lg: 4 }, justifySelf: "flex-end" }}>
            <DatePicker
              defaultValue={dayjs().set("month", 0).set("date", 1)}
              sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                "& .MuiInputAdornment-positionEnd": {
                  marginRight: "7px",
                },
                "& .MuiInput-underline:before": {
                  borderBottomWidth: "0px",
                  mr: 200,
                  ml: 200,
                },
                "& .MuiInput-underline:after": {
                  borderBottomWidth: "0px",
                },
                "& .MuiInputBase-input": {
                  pb: 0,
                },
              }}
              slotProps={{
                inputAdornment: { position: "start" },
                textField: {
                  size: "small",
                  variant: "standard",
                  helperText: "",
                },
              }}
              slots={{
                openPickerIcon: () => (
                  <DateRangeIcon
                    sx={{
                      color: MUITheme.palette.primary.main,
                      mr: { md: 0, lg: 3 },
                    }}
                  />
                ),
              }}
              onChange={(newValue: any) => {
                let month;
                if (newValue.$M + 1 < 10) month = "0" + (newValue.$M + 1);
                else month = newValue.$M + 1;

                let day;
                if (newValue.$D < 10) day = "0" + newValue.$D;
                else day = newValue.$D;
                setDate(newValue.$y + "-" + month + "-" + day);
              }}
            />
          </Box>
        </Box>
        <Hidden lgDown>
          <CustomButton
            variant="contained"
            sx={{
              borderRadius: "14px",
              height: "100%",
              width: "228px",
            }}
            onClick={search}
          >
            Search
          </CustomButton>
        </Hidden>
      </Box>
      <Hidden lgUp>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: -5, sm: -5, md: -5 },
          }}
        >
          <CustomButton
            variant="contained"
            sx={{
              borderRadius: "32px",
              height: "40px",
              width: "100%",
              zIndex: 99,
            }}
            onClick={search}
          >
            Search
          </CustomButton>
        </Box>
      </Hidden>
    </>
  );
}
