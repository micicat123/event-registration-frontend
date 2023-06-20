import axios from "../conifg/axios.config";
import Cookies from "js-cookie";

export class UserRegisterStore {
  register = (
    username: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string
  ) => {
    return register(username, password, passwordConfirm, firstName, lastName);
  };

  postUserPicture = (formData: any, uid: string) => {
    return postUserPicture(formData, uid);
  };
}

const register = async (
  username: string,
  password: string,
  passwordConfirm: string,
  firstName: string,
  lastName: string
) => {
  const { data } = await axios.post("/auth/register", {
    email: username,
    password,
    passwordConfirm,
    firstName,
    lastName,
  });
  return data;
};

const postUserPicture = async (formData: any, uid: string) => {
  const token = Cookies.get("jwt");
  if (token) {
    return await axios.post(`/upload/profile_pictures/${uid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
