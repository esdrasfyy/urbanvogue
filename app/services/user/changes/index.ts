import axios, { AxiosResponse } from "axios";
import {
  ChangesApiReq,
  ChangesApiResponse,
  ChangesApiProps,
} from "./types/index";

async function ChangesApi(data: ChangesApiProps): Promise<ChangesApiResponse> {
  const api = process.env.API;

  try {
    if (!data.user_id) {
      throw new Error("userId parameter is empty or undefined.");
    }

    if (!data.change) {
      throw new Error("change parameter is empty or undefined.");
    }
    const response: AxiosResponse<ChangesApiReq | null> = await axios.post(
      `${api}user/changes`,
      {
        change: data.change,
        email: data.email,
        user_id: data.user_id,
        phone: data.phone,
        password: data.password,
      }
    );

    if (response.status === 201) {
      return {
        data: {
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 201 && response.status !== 500) {
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

export { ChangesApi };
