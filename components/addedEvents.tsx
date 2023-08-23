import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { CustomButton } from "../conifg/MUI_styled_components";
import SettingsIcon from "@mui/icons-material/Settings";
import Draggable from "react-draggable";
import { GetUserStore } from "../api/getUser";

interface AddedEventsProps {
  addedEvents: any[];
  setAddedEvents: Function;
  setManagedEvent: Function;
}
const AddedEvents: React.FC<AddedEventsProps> = ({
  addedEvents,
  setAddedEvents,
  setManagedEvent,
}) => {
  const [boundValue, setBoundValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const userStore = new GetUserStore();
      const fetchedEvents = await userStore.getUsersAddedEvents();
      setAddedEvents(fetchedEvents);
      setBoundValue((fetchedEvents.length - 4) * 103);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ pt: 10, flex: 1, pb: 10 }}>
      <Typography
        color="textPrimary"
        variant="h3"
        sx={{ mb: "55px", fontWeight: "550" }}
      >
        Added Events
      </Typography>

      <Box
        sx={{
          overflow: "hidden",
          height: "calc(100vh - 330px)",
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
            {addedEvents.map((addedEvent: any, index) => (
              <Box key={index}>
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
                  <Box sx={{ display: "flex", gap: { xs: 1, sm: 5 } }}>
                    <Box>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                        sx={{ fontWeight: "550" }}
                      >
                        {format(new Date(addedEvent.date), "dd. MMM")}
                      </Typography>
                      <Typography color="textPrimary" variant="body1">
                        {format(parseISO(addedEvent.date), "EEE")}{" "}
                        {addedEvent.hour}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                        sx={{ fontWeight: "550" }}
                      >
                        {addedEvent.eventName}
                      </Typography>
                      <Typography color="textPrimary" variant="body1">
                        {addedEvent.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <CustomButton
                      variant="contained"
                      sx={{
                        borderRadius: "16px",
                        height: "51px",
                        width: "56px",
                      }}
                      onClick={() => setManagedEvent(addedEvent)}
                    >
                      <SettingsIcon sx={{ color: "white" }} />
                    </CustomButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Draggable>
      </Box>
    </Box>
  );
};

export default AddedEvents;
