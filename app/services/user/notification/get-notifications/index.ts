import axios, { AxiosResponse } from "axios";
import {
  getNotificationsApiReq,
  getNotificationsApiResponse,
  getNotificationsProps,
} from "./types/index";

async function getNotifications({
  user_id,
}: getNotificationsProps): Promise<getNotificationsApiResponse> {
  const api = process.env.API;
  try {
    if (!user_id) {
      throw new Error("user_id parameter is empty or undefined.");
    }
    const response: AxiosResponse<getNotificationsApiReq | null> =
      await axios.get(`${api}user/notifications?id=${user_id}`);
    
    if (response.status === 200) {
      return {
        data: {
          notifications: response?.data?.notifications || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          notifications: null,
          msg: response?.data?.msg || null,
        },
        error: response?.data?.msg || "Unknown error.",
        status: response.status,
      };
    }
    throw new Error(response?.data?.msg || "Unknown error.");
  } catch (error: any) {
    return {
      data: {
        notifications: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { getNotifications };
