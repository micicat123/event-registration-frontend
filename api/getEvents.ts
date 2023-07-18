import axios from "../conifg/axios.config";
import Cookies from "js-cookie";

export class GetEventsStore {
  getSearchedEvents = (date: string, location: string) => {
    try {
      return getSearchedEvents(date, location);
    } catch (e) {
      return null;
    }
  };

  getEventPicture = (id: string) => {
    try {
      return getEventPicture(id);
    } catch (e) {
      return null;
    }
  };

  getUpcomingEvents = (lastDate: string) => {
    try {
      return getUpcomingEvents(lastDate);
    } catch (e) {
      return null;
    }
  };
}

const getSearchedEvents = async (date: string, location: string) => {
  const { data } = await axios.get(`/event/search/${location}/${date}`);
  return data;
};

const getEventPicture = async (id: string) => {
  const response = await axios.get(`/upload/events/${id}`, {
    responseType: "blob",
  });
  return URL.createObjectURL(response.data);
};

const getUpcomingEvents = async (lastDate: string) => {
  const token = Cookies.get("jwt");
  if (token) {
    const { data } = await axios.get(`/event/${lastDate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } else {
    return null;
  }
};
