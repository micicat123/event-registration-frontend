import axios from "../conifg/axios.config";
import Cookies from "js-cookie";

export class UpdateRegistrationsStore {
  addRegistration = (eventId: string) => {
    try {
      return addRegistration(eventId);
    } catch (e) {
      return null;
    }
  };

  removeRegistration = (registrationId: string) => {
    try {
      return removeRegistration(registrationId);
    } catch (e) {
      return null;
    }
  };
}

const addRegistration = async (eventId: string) => {
  const token = Cookies.get("jwt");
  if (token) {
    const { data } = await axios.post(`/registration/${eventId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } else {
    return null;
  }
};

const removeRegistration = async (registrationId: string) => {
  const token = Cookies.get("jwt");
  if (token) {
    const { data } = await axios.delete(`/registration/${registrationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } else {
    return null;
  }
};
