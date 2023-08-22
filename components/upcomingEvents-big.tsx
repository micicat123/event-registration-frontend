import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetEventsStore } from "../api/getEvents";
import { format, parseISO } from "date-fns";
import { CustomButton, FlexBox } from "../conifg/MUI_styled_components";
import { useRouter } from "next/router";

export default function UpcomingEventsBig() {
  const router: any = useRouter();
  const [lastDate, setLastDate] = useState<string>("0");
  const [events, setEvents] = useState<any[]>([]);
  const [loadMore, setLoadmore] = useState<boolean>(true);
  const getEventsStore = new GetEventsStore();

  useEffect(() => {
    handleLoadMore();
  }, []);

  const handleLoadMore = async () => {
    const fetchedEvents = await getEventsStore.getUpcomingEvents(lastDate);
    if (fetchedEvents !== null) {
      const lastEvent = fetchedEvents[fetchedEvents.length - 1];
      const { date } = lastEvent;
      setLastDate(date);
      setEvents((prevEvents) => [...prevEvents, ...fetchedEvents]);
    } else {
      setLoadmore(false);
    }
  };

  const openEventPage = (event: any) => {
    router.push({
      pathname: "/event",
      query: { events: JSON.stringify(event) },
    });
  };

  return (
    <>
      <Box sx={{ mt: 22, mb: 8 }}>
        <Typography color="textPrimary" variant="h2" sx={{ fontWeight: "550" }}>
          Events
        </Typography>
        <Typography
          color="textPrimary"
          variant="h3"
          sx={{ mt: "32px", mb: "37px", fontWeight: "550" }}
        >
          All Upcoming Events
        </Typography>
        <Box sx={{ mb: 5 }}>
          {events.map((event, index) => (
            <Box
              key={index}
              sx={{
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "16px",
                mb: 2,
                py: 2,
                px: { xs: 0.5, sm: 1, md: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: { xs: 2, sm: 5, md: 10 },
                  pl: 4,
                }}
              >
                <Box>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    sx={{ fontWeight: "550" }}
                  >
                    {format(new Date(event.date), "dd. MMM")}
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    {format(parseISO(event.date), "EEE")}. {event.hour}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    sx={{ fontWeight: "550" }}
                  >
                    {event.eventName}
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    {event.location}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <CustomButton
                  variant="contained"
                  sx={{
                    borderRadius: "16px",
                    height: "46px",
                    width: { xs: "79px", sm: "120px", md: "180px" },
                    mr: 2,
                  }}
                  onClick={() => openEventPage(event)}
                >
                  Check
                </CustomButton>
              </Box>
            </Box>
          ))}
        </Box>
        {loadMore && (
          <FlexBox>
            <CustomButton
              variant="contained"
              sx={{
                borderRadius: "32px",
                height: "40px",
                width: "137px",
              }}
              onClick={handleLoadMore}
            >
              Load more
            </CustomButton>
          </FlexBox>
        )}
      </Box>
    </>
  );
}
