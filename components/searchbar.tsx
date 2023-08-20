import { Box, Button, TextField } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        height: "44px",
        backgroundColor: "white",
        borderRadius: "16px",
        width: "105%",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1,
        position: "relative",
      }}
    >
      <FlexBox gap={14.5}>
        <FlexBox>
          <LocationOnIcon color="primary" sx={{ ml: 5, mr: 3 }} />

          <CustomTextInput
            placeholder="Search by location"
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(e.target.value);
            }}
          />
        </FlexBox>
        <hr style={{ height: "42px", opacity: "50%" }} />
        <Box sx={{ pl: 4 }}>
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
                mr: 11,
                ml: 7,
              },
              "& .MuiInput-underline:after": {
                borderBottomWidth: "0px",
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
                  sx={{ color: MUITheme.palette.primary.main, mr: "32px" }}
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
      </FlexBox>
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
    </Box>
  );
}
