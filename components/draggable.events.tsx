import { Box, Typography } from "@mui/material";
import { FlexBox } from "../conifg/MUI_styled_components";
import { useEffect, useState } from "react";
import { GetEventsStore } from "../api/getEvents";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Draggable from "react-draggable";
import CircleIcon from "@mui/icons-material/Circle";
import { format } from "date-fns";
import { useRouter } from "next/router";

export default function DraggableEvents({ events }: { events: any[] }) {
  const router = useRouter();
  const [images, setImages] = useState<any[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [clickStartTime, setClickStartTime] = useState<number | null>(null);
  const [boundValue, setBoundValue] = useState<number>(0);

  const bounds = [
    0, 0, 0, 200, 275, 560, 1100, 1500, 1860, 2280, 2680, 3500, 3900, 4300,
    4750, 4750, 4750,
  ];

  useEffect(() => {
    const fetchData = async () => {
      setBoundValue(bounds[events.length - 1]);

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

  const handleMouseUp = (event: any) => {
    if (clickStartTime && Date.now() - clickStartTime < 100) {
      router.push({
        pathname: "/event",
        query: { events: JSON.stringify(event) },
      });
    }

    setClickStartTime(null);
  };

  if (events.length < 1 || images.length < 1) {
    return (
      <>
        <Typography
          color="primary"
          variant="h1"
          sx={{
            fontSize: "35px",
            textAlign: "center",
            mt: "100px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          There are no events matching your search criteria.
        </Typography>
        <Typography
          color="textPrimary"
          variant="h5"
          sx={{
            textAlign: "center",
          }}
        >
          Please try a different search.
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ mt: 22, mb: 2, overflow: "hidden" }}>
      <Draggable
        axis="x"
        bounds={{
          left: -boundValue,
          right: 10,
        }}
      >
        <Box gap={3} sx={{ display: "flex", width: "100%" }}>
          {events.map((event, index) => (
            <Box
              key={event.id}
              sx={{
                boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                borderRadius: "0.5rem",
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onMouseDown={() => setClickStartTime(Date.now())}
              onMouseUp={() => handleMouseUp(event)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <Box
                sx={{
                  width: "387px",
                  height: "247px",
                  borderRadius: "8px",
                  position: "absolute",
                  transition: "background 0.3s",
                  zIndex: 1,
                  background:
                    hoveredIndex === index
                      ? "linear-gradient(0deg, rgba(47, 60, 126, 0.50) 0%, rgba(47, 60, 126, 0.50) 100%)"
                      : undefined,
                }}
              />
              <Box
                component="img"
                sx={{
                  width: "387px",
                  height: "247px",
                  borderRadius: "8px",
                  transition: "filter 0.3s",
                  zIndex: -1,
                  filter: hoveredIndex === index ? "blur(2px)" : undefined,
                }}
                src={images[index]}
                draggable={false}
              />

              <Box sx={{ p: 1 }}>
                <Typography color="primary" variant="h3">
                  {event.eventName}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  {format(new Date(event.date), "d.M.yyyy")}, {event.hour}
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
        </Box>
      </Draggable>
      <FlexBox sx={{ mt: 2 }} gap={1}>
        <CircleIcon color="primary" sx={{ fontSize: "8px" }} />
        <CircleIcon sx={{ fontSize: "8px", color: "#C4C4C4" }} />
        <CircleIcon sx={{ fontSize: "8px", color: "#C4C4C4" }} />
        <CircleIcon sx={{ fontSize: "8px", color: "#C4C4C4" }} />
        <CircleIcon sx={{ fontSize: "8px", color: "#C4C4C4" }} />
      </FlexBox>
    </Box>
  );
}
