import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetUserStore } from "../api/getUser";
import { format, parseISO } from "date-fns";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateRegistrationsStore } from "../api/updateRegistrations";
import Draggable from "react-draggable";
import BookButton from "./bookButton";
import { useRouter } from "next/router";

export default function UpcomingEventsSmall() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [unregisteredEvents, setUnregisteredEvents] = useState<any[]>([]);
  const [buttonIsHovered, setButtonIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const registrationStore = new UpdateRegistrationsStore();
  const [boundValue, setBoundValue] = useState<number>(0);
  const router: any = useRouter();

  useEffect(() => {
    (async () => {
      const userStore = new GetUserStore();
      const fetchedRegistrations = await userStore.getUserRegistrations();
      console.log(fetchedRegistrations);
      setRegistrations(fetchedRegistrations);
      try {
        setBoundValue((fetchedRegistrations.length - 3) * 110);
        setIsLoggedIn(true);
      } catch (e) {
        router.push("/");
      }
    })();
  }, []);

  const removeRegistration = async (registrationId: string) => {
    await registrationStore.removeRegistration(registrationId);

    setUnregisteredEvents((prevUnregisteredEvents) => [
      ...prevUnregisteredEvents,
      registrationId,
    ]);
  };

  const addRegistration = async (eventId: string, registrationId: string) => {
    await registrationStore.addRegistration(eventId);
    const updatedUnregisteredEvents = unregisteredEvents.filter(
      (id) => id !== registrationId
    );
    setUnregisteredEvents(updatedUnregisteredEvents);
  };

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <Box sx={{ flex: 1, mt: { xs: 10, sm: 10, md: 0 } }}>
      <Typography
        color="textPrimary"
        variant="h3"
        sx={{ mb: "26px", fontWeight: "550" }}
      >
        All Upcoming Events
      </Typography>
      <Box
        sx={{
          overflow: "hidden",
          height: "calc(100vh - 420px)",
        }}
      >
        <Draggable
          axis="y"
          bounds={{
            top: -boundValue,
            bottom: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
            }}
          >
            {registrations.map((registration) => (
              <Box key={registration.registrationId}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    px: { xs: 0.5, sm: 1, md: 2 },
                    py: 2,
                    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Box sx={{ display: "flex", gap: { xs: 2, sm: 7, md: 15 } }}>
                    <Box>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                        sx={{ fontWeight: "550" }}
                      >
                        {format(
                          new Date(registration.eventData.date),
                          "dd. MMM"
                        )}
                      </Typography>
                      <Typography color="textPrimary" variant="body1">
                        {format(parseISO(registration.eventData.date), "EEE")}{" "}
                        {registration.eventData.hour}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                        sx={{ fontWeight: "550" }}
                      >
                        {registration.eventData.eventName}
                      </Typography>
                      <Typography color="textPrimary" variant="body1">
                        {registration.eventData.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <BookButton
                      registration={registration}
                      removeRegistration={removeRegistration}
                      addRegistration={addRegistration}
                      unregisteredEvents={unregisteredEvents}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Draggable>
      </Box>
    </Box>
  );
}
