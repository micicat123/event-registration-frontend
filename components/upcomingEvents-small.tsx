import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetEventsStore } from "../api/getEvents";
import { format, parseISO } from "date-fns";
import { FlexBox } from "../conifg/MUI_styled_components";
import { useRouter } from "next/router";

export default function UpcomingEventsBig() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    console.log("fetch user registrations");
  }, []);

  return <></>;
}
