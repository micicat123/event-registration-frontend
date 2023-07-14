import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetEventsStore } from "../api/getEvents";
import { format, parseISO } from "date-fns";
import { FlexBox } from "../conifg/MUI_styled_components";

export default function UpcomingEventsBig() {
  const [lastDate, setLastDate] = useState<string>("0");
  const [events, setEvents] = useState<any[]>([]);
  const getEventsStore = new GetEventsStore();

  useEffect(() => {
    handleLoadMore();
  }, []);

  const handleLoadMore = async () => {
    const fetchedEvents = await getEventsStore.getUpcomingEvents(lastDate);
    if (fetchedEvents.length > 0) {
      const lastEvent = fetchedEvents[fetchedEvents.length - 1];
      const { date } = lastEvent;
      setLastDate(date);
      setEvents((prevEvents) => [...prevEvents, ...fetchedEvents]);
    }
  };

  return (
    <Box sx={{ mt: 22, mb: 2 }}>
      <Typography color="textPrimary" variant="h2">
        Events
      </Typography>
      <Typography
        color="textPrimary"
        variant="h3"
        sx={{ mt: "32px", mb: "37px" }}
      >
        All Upcoming Events
      </Typography>
      <Box>
        {events.map((event, index) => (
          <Box
            key={index}
            sx={{
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "75px",
              borderRadius: "16px",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 10, pl: 4 }}>
              <Box>
                <Typography color="textPrimary" variant="body2">
                  {format(new Date(event.date), "dd. MMM")}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  {format(parseISO(event.date), "EEE")}. {event.hour}
                </Typography>
              </Box>
              <Box>
                <Typography color="textPrimary" variant="body2">
                  {event.eventName}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  {event.location}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "16px",
                  height: "46px",
                  width: "180px",
                  mr: 2,
                }}
              >
                Check
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <FlexBox>
        <Button
          variant="contained"
          sx={{
            borderRadius: "32px",
            height: "40px",
            width: "137px",
          }}
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      </FlexBox>
    </Box>
  );
}
