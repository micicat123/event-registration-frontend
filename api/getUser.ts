import axios from "../conifg/axios.config";
import Cookies from "js-cookie";

export class GetUserStore {
  getUser = () => {
    try {
      return getUser();
    } catch (e) {
      return null;
    }
  };

  getUserPicture = () => {
    try {
      return getUserPicture();
    } catch (e) {
      return null;
    }
  };

  getUserRegistrations = () => {
    try {
      return getUserRegistrations();
    } catch (e) {
      return null;
    }
  };

  getUserPastRegistrations = () => {
    try {
      return getUserPastRegistrations();
    } catch (e) {
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
  } else {
    return null;
  }
};

const getUserPicture = async () => {
  const token = Cookies.get("jwt");
  if (token) {
    const response = await axios.get("/upload/profile_pictures", {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return URL.createObjectURL(response.data);
  } else {
    return null;
  }
};

const getUserRegistrations = async () => {
  const token = Cookies.get("jwt");
  if (token) {
    const response = await axios.get("/registration", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } else {
    return null;
  }
};

const getUserPastRegistrations = async () => {
  const token = Cookies.get("jwt");
  if (token) {
    const response = await axios.get("/registration/past", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } else {
    return null;
  }
};
