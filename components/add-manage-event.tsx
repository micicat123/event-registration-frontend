import { Box, Button, FormControl, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { CustomButton, CustomTextInput } from "../conifg/MUI_styled_components";
import MUITheme from "../conifg/MUI_theme";
import { DatePicker, DateRangeIcon, TimePicker } from "@mui/x-date-pickers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs, { Dayjs } from "dayjs";
import { ManageEventStore } from "../api/manageEvent";

interface AddedEventsProps {
  managedEvent: any;
  setManagedEvent: Function;
}
const AddManageEvent: React.FC<AddedEventsProps> = ({
  managedEvent,
  setManagedEvent,
}) => {
  const [eventName, setEventName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(
    dayjs().set("month", 0).set("date", 1)
  );
  const [hour, setHour] = useState<Dayjs | null>(dayjs("2022-04-17T00:00"));
  const [maxUsers, setMaxUsers] = useState<string>("0");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null | string>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (managedEvent != "") {
      setEventName(managedEvent.eventName);
      setLocation(managedEvent.location);
      setDate(dayjs(`${managedEvent.date}T00:00`));
      setHour(dayjs(`2022-04-17T${managedEvent.hour}`));
      setMaxUsers(managedEvent.maxUsers);
      setDescription(managedEvent.description);
      setFile("old image");
      setErrorMessage("");
    }
  }, [managedEvent]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) setFile(file);
  };

  const resetStates = () => {
    setEventName("");
    setLocation("");
    setDate(dayjs().set("month", 0).set("date", 1));
    setHour(dayjs("2022-04-17T00:00"));
    setMaxUsers("0");
    setDescription("");
    setFile(null);
    setManagedEvent("");
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const manageEventStore = new ManageEventStore();
    const formattedDate = date?.format("YYYY-MM-DD") || "";
    const formattedHour = hour?.format("HH:mm") || "";

    if (!/^[0-9]+$/.test(maxUsers)) {
      setErrorMessage("Please enter a valid number for Max Users.");
    }
    //update event
    else if (managedEvent != "") {
      try {
        if (file && file !== "old image") {
          const formData = new FormData();
          formData.append("image", file);
          manageEventStore.postEventPicture(formData, managedEvent.eventId);
        }
        manageEventStore.editEvent(
          managedEvent.eventId,
          eventName,
          location,
          formattedDate,
          formattedHour,
          Number(maxUsers),
          description
        );

        resetStates();
        setSuccessMessage("Succesfully updated your event.");
      } catch (err) {
        setErrorMessage("Couldn't edit your event");
      }
    }
    //add event
    else {
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
        try {
          const eventData = await manageEventStore.addEvent(
            eventName,
            location,
            formattedDate.toString(),
            formattedHour,
            Number(maxUsers),
            description
          );
          manageEventStore.postEventPicture(
            formData,
            eventData?.data.event.eventId
          );

          resetStates();
          setSuccessMessage("Succesfully created your event.");
        } catch (err: any) {
          setErrorMessage("Couldn't add your event");
        }
      } else {
        setErrorMessage("You need to provide image file.");
      }
    }
  };

  return (
    <Box sx={{ pt: 10, flex: 1 }}>
      {managedEvent === "" ? (
        <Typography color="textPrimary" variant="h3" sx={{ mb: "33px" }}>
          Add event
        </Typography>
      ) : (
        <Typography color="textPrimary" variant="h3" sx={{ mb: "33px" }}>
          Manage event
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl sx={{ display: "block" }}>
          <Typography
            color="textPrimary"
            variant="body2"
            sx={{ fontSize: "12px", lineHeight: "16px", mb: "8px" }}
          >
            Event name
          </Typography>
          <CustomTextInput
            value={eventName}
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEventName(e.target.value);
            }}
            sx={{
              width: "100%",
            }}
            required
          />
        </FormControl>
        <br />

        <FormControl sx={{ display: "block" }}>
          <Typography
            color="textPrimary"
            variant="body2"
            sx={{ fontSize: "12px", lineHeight: "16px", mb: "8px" }}
          >
            Location
          </Typography>
          <CustomTextInput
            variant="standard"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(e.target.value);
            }}
            sx={{
              width: "100%",
            }}
            required
          />
        </FormControl>
        <br />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ display: "block" }}>
            <Typography
              color="textPrimary"
              variant="body2"
              sx={{ fontSize: "12px", lineHeight: "16px", mb: "8px" }}
            >
              Date
            </Typography>
            <DatePicker
              value={date}
              format="DD.MM.YYYY"
              sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                pt: 0.5,
                px: "7px",
                "& .MuiInputLabel-root": {
                  marginLeft: "7px",
                },
                "& .MuiInputBase-root": {
                  paddingLeft: "7px",
                },
                "& .MuiInputAdornment-positionEnd": {
                  marginRight: "7px",
                },
                "& .MuiInput-underline:before": {
                  borderBottomWidth: "0px",
                  marginLeft: "2.5%",
                  marginRight: "2.5%",
                },
                "& .MuiInput-underline:after": {
                  borderBottomWidth: "0px",
                },
              }}
              slotProps={{
                textField: {
                  size: "small",
                  variant: "standard",
                  helperText: "",
                },
              }}
              slots={{
                openPickerIcon: () => (
                  <DateRangeIcon
                    sx={{ color: MUITheme.palette.primary.main, pb: 1 }}
                  />
                ),
              }}
              onChange={(newValue) => setDate(newValue)}
            />
          </FormControl>

          <FormControl sx={{ display: "block" }}>
            <Typography
              color="textPrimary"
              variant="body2"
              sx={{ fontSize: "12px", lineHeight: "16px", mb: "8px" }}
            >
              Hour
            </Typography>
            <TimePicker
              value={hour}
              onChange={(newValue) => setHour(newValue)}
              ampm={false}
              sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                pt: 0.5,
                px: "7px",
                "& .MuiInputLabel-root": {
                  marginLeft: "7px",
                },
                "& .MuiInputBase-root": {
                  paddingLeft: "7px",
                },
                "& .MuiInputAdornment-positionEnd": {
                  marginRight: "7px",
                },
                "& .MuiInput-underline:before": {
                  borderBottomWidth: "0px",
                  marginLeft: "2.5%",
                  marginRight: "2.5%",
                },
                "& .MuiInput-underline:after": {
                  borderBottomWidth: "0px",
                },
              }}
              slotProps={{
                textField: {
                  size: "small",
                  variant: "standard",
                  helperText: "",
                },
              }}
              slots={{
                openPickerIcon: () => (
                  <AccessTimeIcon
                    sx={{ color: MUITheme.palette.primary.main, pb: 1 }}
                  />
                ),
              }}
            />
          </FormControl>

          <FormControl sx={{ display: "block" }}>
            <Typography
              color="textPrimary"
              variant="body2"
              sx={{ fontSize: "12px", lineHeight: "16px", mb: "8px" }}
            >
              Max. users
            </Typography>
            <CustomTextInput
              value={maxUsers}
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMaxUsers(e.target.value);
              }}
              required
            />
          </FormControl>
        </Box>
        <br />

        <FormControl sx={{ display: "block" }}>
          <Typography
            color="textPrimary"
            variant="body2"
            sx={{ fontSize: "12px", lineHeight: "16px", mb: "8px" }}
          >
            Description
          </Typography>
          <CustomTextInput
            value={description}
            variant="standard"
            multiline
            rows={4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            sx={{
              width: "100%",
            }}
            required
          />
        </FormControl>

        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          <input
            type="file"
            id="image-input"
            accept="image/*"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            onChange={handleFileChange}
          />
          {/* Visible button */}
          <Button
            variant="contained"
            sx={{
              my: "18px",
              borderRadius: "32px",
              height: "40px",
              width: "100%",
              textTransform: "none",
              fontFamily: "Raleway, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "18.78px",
              backgroundColor: MUITheme.palette.text.primary,
              "&:hover": {
                backgroundColor: MUITheme.palette.primary.main,
              },
            }}
            onClick={() => {
              const fileInput = document.getElementById("image-input");
              fileInput?.click();
            }}
          >
            Add image
          </Button>
        </Box>

        <CustomButton
          variant="contained"
          sx={{
            borderRadius: "32px",
            height: "40px",
            width: "100%",
          }}
          type="submit"
        >
          Submit
        </CustomButton>
        <Typography color="red" variant="body1" sx={{ mt: 1, ml: 0.5 }}>
          {errorMessage}
        </Typography>
        <Typography color="green" variant="body1" sx={{ mt: 1, ml: 0.5 }}>
          {successMessage}
        </Typography>
      </form>
    </Box>
  );
};

export default AddManageEvent;
