import { useEffect, useState } from "react";
import { GetUserStore } from "../../api/getUser";
import Layout from "../../components/layout";
import { Box } from "@mui/material";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import MUITheme from "../../conifg/MUI_theme";
import AddManageEvent from "../../components/add-manage-event";
import AddedEvents from "../../components/addedEvents";

export default function ManageEventPage(props: any) {
  const [managedEvent, setManagedEvent] = useState<any>("");
  const [addedEvents, setAddedEvents] = useState<[]>([]);

  return (
    <Layout>
      <Box sx={{ backgroundColor: MUITheme.palette.secondary.main }}>
        <Nav />
        <Box sx={{ display: "flex", gap: 5, px: 10 }}>
          <AddManageEvent
            managedEvent={managedEvent}
            setManagedEvent={setManagedEvent}
          />
          <AddedEvents
            addedEvents={addedEvents}
            setAddedEvents={setAddedEvents}
            setManagedEvent={setManagedEvent}
          />
        </Box>

        <Footer />
      </Box>
    </Layout>
  );
}
