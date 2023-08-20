import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetUserStore } from "../api/getUser";
import { format, parseISO } from "date-fns";
import Draggable from "react-draggable";

export default function RecentEvents() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [boundValue, setBoundValue] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const userStore = new GetUserStore();
      const fetchedRegistrations = await userStore.getUserPastRegistrations();
      setRegistrations(fetchedRegistrations);
      setBoundValue((fetchedRegistrations.length - 3) * 110);
    })();
  }, []);

  if (registrations.length < 1) {
    return <></>;
  }

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        color="textPrimary"
        variant="h3"
        sx={{ mb: "26px", fontWeight: "550" }}
      >
        Recent Events
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
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    gap: 15,
                    px: 2,
                    py: 1,
                    height: "75px",
                    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Box>
                    <Typography
                      color="textPrimary"
                      variant="body2"
                      sx={{ fontWeight: "550" }}
                    >
                      {format(new Date(registration.eventData.date), "dd. MMM")}
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
              </Box>
            ))}
          </Box>
        </Draggable>
      </Box>
    </Box>
  );
}
