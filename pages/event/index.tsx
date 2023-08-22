import { Box, Hidden, Link, Typography } from "@mui/material";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import { GetEventsStore } from "../../api/getEvents";
import { format } from "date-fns";
import MUITheme from "../../conifg/MUI_theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { CustomButton, FlexBox } from "../../conifg/MUI_styled_components";
import { GetUserStore } from "../../api/getUser";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateRegistrationsStore } from "../../api/updateRegistrations";

export default function EventPage(props: any) {
  const [event, setEvent] = useState<any>();
  const [image, setImage] = useState<any>();
  const [registrationId, setRegistrationId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [buttonIsHovered, setButtonIsHovered] = useState(false);
  const router: any = useRouter();
  const registrationStore = new UpdateRegistrationsStore();

  useEffect(() => {
    const fetchedEvent = JSON.parse(router.query.events);
    setEvent(fetchedEvent);

    const fetchData = async () => {
      const getEventsStore = new GetEventsStore();
      if (fetchedEvent) {
        const image = await getEventsStore.getEventPicture(fetchedEvent.id);
        setImage(image);
      }

      const userStore = new GetUserStore();
      try {
        const userRegistrations = await userStore.getUserRegistrations();
        for (const registration of userRegistrations) {
          if (registration.eventId === fetchedEvent.id) {
            setIsRegistered(true);
            setRegistrationId(registration.registrationId);
          }
        }
        setIsLoggedIn(true);
      } catch (err) {
        console.log("user is not logged in");
      }
    };

    fetchData();
  }, []);

  const addRegistration = async () => {
    await registrationStore.addRegistration(event.id);
    setIsRegistered(true);
  };

  const removeRegistration = async () => {
    await registrationStore.removeRegistration(registrationId);
    setIsRegistered(false);
  };

  if (!event) {
    return <></>;
  }
  return (
    <Layout>
      <Hidden mdDown>
        <Box
          component="img"
          sx={{
            maxWidth: "50%",
            borderTopLeftRadius: "8px",
            position: "fixed",
            bottom: 0,
            right: 0,
            transition:
              "opacity 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            "&:hover": {
              opacity: 0.9,
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            },
          }}
          src={image}
        />
      </Hidden>
      <Hidden mdUp>
        <Nav />
        <Box
          component="img"
          sx={{
            width: "100%",
            transition:
              "opacity 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            "&:hover": {
              opacity: 0.9,
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            },
          }}
          src={image}
        />
      </Hidden>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Hidden mdDown>
          <Nav />
        </Hidden>

        <Box
          sx={{
            width: { sm: "100%", md: "81.5%" },
            backgroundColor: {
              sm: "#FFFFFF",
              md: MUITheme.palette.secondary.main,
            },
            pt: { sm: 0, md: 20 },
            px: { xs: 2, sm: 10 },
          }}
        >
          <Box sx={{ width: { sm: "100%", md: "50%" } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                color="textPrimary"
                variant="body1"
                sx={{ fontWeight: "550" }}
              >
                {format(new Date(event.date), "d.M.yyyy")}
              </Typography>
              <Typography
                color="textPrimary"
                variant="body1"
                sx={{ fontWeight: "550" }}
              >
                {event.hour}
              </Typography>
            </Box>

            <Typography
              color="primary"
              variant="h1"
              sx={{ lineHeight: "64px", mt: "24px", mb: "20px" }}
            >
              {event.eventName}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FlexBox>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography
                  color="textPrimary"
                  variant="body1"
                  sx={{ fontWeight: "550" }}
                >
                  {event.location}
                </Typography>
              </FlexBox>
              <FlexBox>
                <PersonIcon color="primary" sx={{ mr: 2 }} />
                <Typography
                  color="textPrimary"
                  variant="body1"
                  sx={{ fontWeight: "550" }}
                >
                  {event.maxUsers}
                </Typography>
              </FlexBox>
            </Box>

            <Typography
              color="textPrimary"
              variant="h6"
              sx={{ mt: "57px", mb: "11px" }}
            >
              EVENT DESCRIPTION:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {event.description}
            </Typography>

            {isLoggedIn ? (
              <>
                {isRegistered ? (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <CustomButton
                      variant="contained"
                      sx={{
                        borderRadius: "16px",
                        height: "51px",
                        width: "56px",
                        mt: "46px",
                        mb: "95px",
                      }}
                      onClick={() => removeRegistration()}
                      onMouseEnter={() => setButtonIsHovered(true)}
                      onMouseLeave={() => setButtonIsHovered(false)}
                    >
                      {buttonIsHovered ? <CloseIcon /> : <DoneIcon />}
                    </CustomButton>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <CustomButton
                      variant="contained"
                      sx={{
                        borderRadius: "16px",
                        height: "51px",
                        width: "90px",
                        mt: "46px",
                        mb: "95px",
                      }}
                      onClick={() => addRegistration()}
                    >
                      Book
                    </CustomButton>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link href="/login">
                    <CustomButton
                      variant="contained"
                      sx={{
                        borderRadius: "16px",
                        height: "40px",
                        width: "137px",
                        mt: "46px",
                        mb: "16px",
                      }}
                    >
                      Login
                    </CustomButton>
                  </Link>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography
                    color="textPrimary"
                    variant="body1"
                    sx={{ mb: "95px" }}
                  >
                    To attend the event, you need to log in.
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Hidden mdDown>
          <Box
            width="18.5%"
            sx={{
              backgroundImage: `url("pictures/background-logo.png")`,
            }}
          />
        </Hidden>
      </Box>
      <Box sx={{ width: { sm: "100%", md: "50%" } }}>
        <Footer />
      </Box>
    </Layout>
  );
}
