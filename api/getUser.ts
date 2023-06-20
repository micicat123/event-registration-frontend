import axios from "../conifg/axios.config";
import Cookies from "js-cookie";

export class GetUserStore {
  isError: boolean = false;

  getUser = () => {
    try {
      return getUser();
    } catch (e) {
      this.isError = true;
      return null;
    }
  };

  getUserPicture = (imageKey: string) => {
    try {
      return getUserPicture(imageKey);
    } catch (e) {
      this.isError = true;
      return null;
    }
  };
}

const getUser = async () => {
  const token = Cookies.get("jwt");
  if (token) {
    const { data } = await axios.get("/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
};

const getUserPicture = async (imageKey: string) => {
  const token = Cookies.get("jwt");
  if (token) {
    const response = await axios.get("/upload/profile_pictures", {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return URL.createObjectURL(response.data);
  }
};
