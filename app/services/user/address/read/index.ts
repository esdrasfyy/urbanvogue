import axios, { AxiosResponse } from "axios";
import { AddressReadApi, AddressReadResponse } from "./types";

async function AddressReadApi(search: string): Promise<AddressReadResponse> {
  const api = process.env.API;
  try {
    const response: AxiosResponse<AddressReadApi | null> = await axios.get(
      `${api}product/search?query=${search}`
    );

    if (response.status === 200) {
      return {
        data: {
          address: response?.data?.address || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          address: null,
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
        address: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { AddressReadApi };
