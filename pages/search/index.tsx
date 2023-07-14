import { Box, Typography } from "@mui/material";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import Searchbar from "../../components/searchbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DraggableEvents from "../../components/draggable.events";
import UpcomingEventsBig from "../../components/upcomingEvents-big";
import Footer from "../../components/footer";

export default function Search(props: any) {
  const [events, setEvents] = useState<any[]>([]);
  const router: any = useRouter();

  useEffect(() => {
    const events = JSON.parse(router.query.events);
    setEvents(events);
  }, [router.query]);

  return (
    <Layout>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
        src="/pictures/background-hero.png"
        draggable={false}
      />
      <Nav />
      <Box sx={{ px: 10, pt: 20 }}>
        <Typography color="textPrimary" variant="h6">
          SEARCH FOR EVENTS
        </Typography>
        <Typography
          color="primary"
          variant="h1"
          sx={{
            lineHeight: "64px",
            maxWidth: "508px",
            mt: "20px",
            mb: "117px",
          }}
        >
          What is next?
        </Typography>
        <Searchbar />
        <DraggableEvents events={events} />
        <UpcomingEventsBig />
      </Box>
      <Footer />
    </Layout>
  );
}
