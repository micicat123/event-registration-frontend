import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { CustomButton } from "../conifg/MUI_styled_components";

interface CustomButtonProps {
  registration: {
    registrationId: string;
    eventData: {
      date: string;
      eventName: string;
      location: string;
      hour: string;
    };
    eventId: string;
  };
  removeRegistration: (registrationId: string) => void;
  addRegistration: (eventId: string, registrationId: string) => void;
  unregisteredEvents: string[];
}

const BookButton: React.FC<CustomButtonProps> = ({
  registration,
  removeRegistration,
  addRegistration,
  unregisteredEvents,
}) => {
  const [buttonIsHovered, setButtonIsHovered] = useState(false);

  return (
    <>
      {unregisteredEvents.includes(registration.registrationId) ? (
        <CustomButton
          variant="contained"
          sx={{
            borderRadius: "16px",
            height: "51px",
            width: "90px",
          }}
          onClick={() =>
            addRegistration(registration.eventId, registration.registrationId)
          }
        >
          Apply
        </CustomButton>
      ) : (
        <CustomButton
          variant="contained"
          sx={{
            borderRadius: "16px",
            height: "51px",
            width: "56px",
          }}
          onClick={() => removeRegistration(registration.registrationId)}
          onMouseEnter={() => setButtonIsHovered(true)}
          onMouseLeave={() => setButtonIsHovered(false)}
        >
          {buttonIsHovered ? <CloseIcon /> : <DoneIcon />}
        </CustomButton>
      )}
    </>
  );
};

export default BookButton;
