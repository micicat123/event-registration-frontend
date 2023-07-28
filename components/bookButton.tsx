import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

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
        <Button
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
        </Button>
      ) : (
        <Button
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
        </Button>
      )}
    </>
  );
};

export default BookButton;
