import { BaseUrl } from "../baseUrl";
import axios, { AxiosResponse } from "axios";
import { Notification } from "./types";
import axiosCli from "utils/axios";
import { Notification as HashCode } from "enum";

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

export const createNotification = async (
  title: string,
  body: string,
  hashCode: HashCode
) => {
  const res = await axiosCli.post("/api/notification/create", {
    title,
    body,
    hashCode,
  });
  return res;
};

export const sendNotification = async (notificationId: string) => {
  const res = await axiosCli.post("/api-v1/notification/send", {
    notificationId,
  });
  return res;
};

export const updateNotification = async (
  notification: Partial<Notification>
) => {
  const res = await axiosCli.put(`/api/notification/edit/${notification._id}`, {
    title: notification.title,
    body: notification.body,
    hashCode: notification.hashCode,
  });
  return res;
};
