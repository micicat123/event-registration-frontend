import { Box, Typography } from "@mui/material";
import { FlexBox } from "../conifg/MUI_styled_components";
import { useEffect, useState } from "react";
import { GetEventsStore } from "../api/getEvents";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

export default function DraggableEvents({ events }: { events: any[] }) {
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const getEventsStore = new GetEventsStore();
      const fetchedImages = [];
      for (const event of events) {
        const image = await getEventsStore.getEventPicture(event.id);
        fetchedImages.push(image);
      }
      setImages(fetchedImages);
    };

    fetchData();
  }, [events]);

  if (events.length < 0 || images.length < 0) {
    return <></>;
  }

  console.log(events);
  return (
    <Box sx={{ mt: 22, mb: 2 }}>
      <FlexBox gap={2}>
        {events.map((event, index) => (
          <Box
            key={event.id}
            sx={{
              boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
              borderRadius: "0.5rem",
            }}
          >
            <Box
              component="img"
              sx={{
                maxwidth: "387px",
                maxHeight: "247px",
                borderRadius: "8px",
              }}
              src={images[index]}
              //draggable={false}
            />
            <Box sx={{ p: 1 }}>
              <Typography color="primary" variant="h3">
                {event.eventName}
              </Typography>
              <Typography color="textPrimary" variant="body1">
                {event.date}, {event.hour}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <FlexBox>
                  <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                  <Typography color="textPrimary" variant="body1">
                    {event.location}
                  </Typography>
                </FlexBox>
                <FlexBox>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  <Typography color="textPrimary" variant="body1">
                    {event.maxUsers}
                  </Typography>
                </FlexBox>
              </Box>
            </Box>
          </Box>
        ))}
      </FlexBox>
      <Box sx={{ backgroundColor: "red", height: "5px" }}></Box>
    </Box>
  );
}
