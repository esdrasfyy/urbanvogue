import axios, { AxiosResponse } from "axios";
import {
  getOrdersApiReq,
  getOrdersApiResponse,
  getOrdersProps,
} from "./types/index";

async function getOrders({
  user_id,
}: getOrdersProps): Promise<getOrdersApiResponse> {
  const api = process.env.API;
  try {
    if (!user_id) {
      throw new Error("user_id parameter is empty or undefined.");
    }
    const response: AxiosResponse<getOrdersApiReq | null> = await axios.get(
      `${api}orders/${user_id}`
    );

    if (response.status === 200) {
      return {
        data: {
          orders: response?.data?.orders || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          orders: null,
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
        orders: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { getOrders };
