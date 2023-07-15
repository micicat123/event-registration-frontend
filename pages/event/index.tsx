import { Box, Typography } from "@mui/material";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import { GetEventsStore } from "../../api/getEvents";

export default function Search(props: any) {
  const [event, setEvent] = useState<any[]>([]);
  const [image, setImage] = useState<any>();
  const router: any = useRouter();

  useEffect(() => {
    const event = JSON.parse(router.query.events);
    setEvent(event);

    const fetchData = async () => {
      const getEventsStore = new GetEventsStore();
      const image = await getEventsStore.getEventPicture(event.id);
      setImage(image);
    };

    fetchData();
  }, [router.query]);

  return (
    <Layout>
      <Nav />
      <Box sx={{ px: 10, pt: 20 }}>
        <Typography color="textPrimary" variant="h6">
          SEARCH FOR EVENTS
        </Typography>
      </Box>
      <Footer />
    </Layout>
  );
}
