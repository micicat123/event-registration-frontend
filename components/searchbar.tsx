import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { FlexBox } from "../conifg/MUI_styled_components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { DatePicker } from "@mui/x-date-pickers";
import MUITheme from "../conifg/MUI_theme";
import { useRouter } from "next/router";
import { GetEventsStore } from "../api/getEvents";

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
    router.push({
      pathname: "/search",
      query: { events: JSON.stringify(events) },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "42px",
        backgroundColor: "white",
        borderRadius: "16px",
        width: "105%",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1,
        position: "relative",
      }}
    >
      <FlexBox>
        <FlexBox>
          <LocationOnIcon color="primary" sx={{ mx: "37px" }} />

          <TextField
            id="standard-basic"
            label="Search by location"
            variant="standard"
            sx={{
              width: "17.5rem",
              borderRight: "1px solid #D8D8D8",
              pr: 4,
            }}
            inputProps={{
              style: {
                height: "10px",
              },
            }}
            InputLabelProps={{
              sx: {
                marginTop: "-7.5px",
              },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(e.target.value);
            }}
          />
        </FlexBox>
        <Box sx={{ pl: 4 }}>
          <DatePicker
            sx={{ width: "17.5rem" }}
            label="Pick a date"
            slotProps={{ textField: { size: "small" } }}
            slots={{
              openPickerIcon: () => (
                <DateRangeIcon sx={{ color: MUITheme.palette.primary.main }} />
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
      <Button
        variant="contained"
        sx={{
          borderRadius: "14px",
          height: "100%",
          width: "228px",
        }}
        onClick={search}
      >
        Search
      </Button>
    </Box>
  );
}
