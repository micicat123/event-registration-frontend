import axios from "../conifg/axios.config";

export class UserLoginLogoutStore {
  login = (username: string, password: string) => {
    return login(username, password);
  };
}

const login = async (username: string, password: string) => {
  await axios.post("/auth/login", {
    username,
    password,
  });
};
