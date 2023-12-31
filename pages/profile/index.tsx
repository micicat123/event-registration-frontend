import { Box, Typography } from "@mui/material";
import Layout from "../../components/layout";
import MUITheme from "../../conifg/MUI_theme";
import Nav from "../../components/nav";
import { useEffect, useState } from "react";
import { GetUserStore } from "../../api/getUser";
import router, { useRouter } from "next/router";
import UpcomingEventsSmall from "../../components/upcomingEvents-small";
import RecentEvents from "../../components/recentEvents";
import Footer from "../../components/footer";

export default function Profile() {
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const userStore = new GetUserStore();
      try {
        const userData = await userStore.getUser();
        setUserDisplayName(userData.user.displayName);
      } catch (err) {
        router.push("/");
      }
    })();
  }, []);

  return (
    <Layout>
      <Box>
        <Nav />
        <Box
          sx={{
            height: "491px",
            width: "100%",
            backgroundColor: MUITheme.palette.secondary.main,
            zIndex: -2,
          }}
        />
        <Box
          sx={{
            backgroundImage: `url("pictures/background-logo.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "calc(100vh - 491px)",
          }}
        />
        <Box
          sx={{ position: "absolute", left: 50, right: 50, top: 175, px: 4 }}
        >
          <Typography
            color="primary"
            variant="h1"
            sx={{
              lineHeight: "64px",
              textAlign: "center",
              mb: "54px",
            }}
          >
            {userDisplayName}
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <UpcomingEventsSmall />
            <RecentEvents />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Layout>
  );
}
