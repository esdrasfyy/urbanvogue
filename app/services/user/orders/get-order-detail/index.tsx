import axios, { AxiosResponse } from "axios";
import {
  getOrderDetailsApiReq,
  getOrderDetailsApiResponse,
  getOrderDetailsProps,
} from "./types/index";

async function getOrderDetails({
  user_id,
  order_id
}: getOrderDetailsProps): Promise<getOrderDetailsApiResponse> {
  const api = process.env.API;
  try {
    if (!user_id) {
      throw new Error("user_id parameter is empty or undefined.");
    }
    const response: AxiosResponse<getOrderDetailsApiReq | null> = await axios.get(
      `${api}order/${user_id}/${order_id}`
    );

    if (response.status === 200) {
      return {
        data: {
          order: response?.data?.order || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          order: null,
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
        order: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { getOrderDetails };
