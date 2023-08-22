import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetUserStore } from "../api/getUser";
import { format, parseISO } from "date-fns";
import Draggable from "react-draggable";
import { useRouter } from "next/router";

export default function RecentEvents() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [boundValue, setBoundValue] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router: any = useRouter();

  useEffect(() => {
    (async () => {
      const userStore = new GetUserStore();
      const fetchedRegistrations = await userStore.getUserPastRegistrations();
      setRegistrations(fetchedRegistrations);
      try {
        setBoundValue((fetchedRegistrations.length - 3) * 110);
        setIsLoggedIn(true);
      } catch (e) {
        router.push("/");
      }
    })();
  }, []);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        color="textPrimary"
        variant="h3"
        sx={{ mb: "26px", fontWeight: "550", mt: { xs: 5, sm: 5, md: 0 } }}
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
                    gap: { xs: 2, sm: 7, md: 15 },
                    px: { xs: 0.5, sm: 1, md: 2 },
                    py: 2,
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
