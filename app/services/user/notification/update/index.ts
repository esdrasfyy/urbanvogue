import axios, { AxiosResponse } from "axios";
import {
  updateNotificationsApiReq,
  updateNotificationsApiResponse,
  updateNotificationsProps,
} from "./types";

async function updateNotifications({
  ids,
  action
}: updateNotificationsProps): Promise<updateNotificationsApiResponse> {
  const api = process.env.API;
  try {
    if (!ids) {
      throw new Error("user_id parameter is empty or undefined.");
    }
    const response: AxiosResponse<updateNotificationsApiReq | null> =
      await axios.post(`${api}user/notifications/update`,{
        ids,
        action
      });
    
    if (response.status === 200) {
      return {
        data: {
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
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
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { updateNotifications };
