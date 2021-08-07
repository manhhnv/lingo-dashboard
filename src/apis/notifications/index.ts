import { BaseUrl } from "../baseUrl";
import axios, { AxiosResponse } from "axios";
import { Notification } from "./types";

export const getListNotifications = async (token: string) => {
  try {
    const response: AxiosResponse<{
      notifications: Notification[];
      total: number;
    }> = await axios.get(`${BaseUrl}/api/notification/listNotifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
