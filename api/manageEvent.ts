import axios from "../conifg/axios.config";
import Cookies from "js-cookie";

export class ManageEventStore {
  addEvent = (
    eventName: string,
    location: string,
    date: string,
    hour: string,
    maxUsers: number,
    description: string
  ) => {
    return addEvent(eventName, location, date, hour, maxUsers, description);
  };

  postEventPicture = (formData: any, eid: string) => {
    return postEventPicture(formData, eid);
  };

  editEvent = (
    id: string,
    eventName: string,
    location: string,
    date: string,
    hour: string,
    maxUsers: number,
    description: string
  ) => {
    return editEvent(
      id,
      eventName,
      location,
      date,
      hour,
      maxUsers,
      description
    );
  };
}

const addEvent = async (
  eventName: string,
  location: string,
  date: string,
  hour: string,
  maxUsers: number,
  description: string
) => {
  const token = Cookies.get("jwt");
  if (token) {
    return await axios.post(
      "/event",
      {
        eventName,
        location,
        date,
        hour,
        maxUsers,
        description,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } else {
    return null;
  }
};

const postEventPicture = async (formData: any, id: string) => {
  const token = Cookies.get("jwt");
  if (token) {
    return await axios.post(`/upload/events/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return null;
  }
};

const editEvent = async (
  id: string,
  eventName: string,
  location: string,
  date: string,
  hour: string,
  maxUsers: number,
  description: string
) => {
  const token = Cookies.get("jwt");
  if (token) {
    return await axios.put(
      `/event/${id}`,
      {
        eventName,
        location,
        date,
        hour,
        maxUsers,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return null;
  }
};
