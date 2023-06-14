import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Nav from "./nav";
import { UserStore } from "../api/getUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [userDisplayName, setUserDisplayName] = useState<string>("");

  useEffect(() => {
    (async () => {
      const userStore = new UserStore();
      const userData = await userStore.getUser();
      if (userData) {
        setUserDisplayName(userData.user.displayName);

        const userImage: any = await userStore.getUserPicture(
          userData.user.customClaims.photoKey
        );
        setUserPhoto(userImage);
      }
    })();
  }, []);

  return (
    <>
      <Nav userDisplayName={userDisplayName} userPhoto={userPhoto} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
