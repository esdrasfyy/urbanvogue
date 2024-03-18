import axios, { AxiosResponse } from "axios";
import {
  RegisterApiProps,
  RegisterApiResponse,
  RegisterApiReq,
} from "./types/index";

async function RegisterApi({
  email,
  fullname,
  password,
  username,
}: RegisterApiProps): Promise<RegisterApiResponse> {
  const api = process.env.API;
  try {
    if (!email || !fullname || !password || !username) {
      throw new Error("Infos parameter is empty or undefined.");
    }
    const response: AxiosResponse<RegisterApiReq | null> = await axios.post(
      `${api}user/create`,
      { email, fullname, password, username }
    );

    if (response?.status === 201) {
      return {
        data: {
          user: response.data?.user,
          msg: null,
        },
        error: null,
        status: 201,
      };
    }
    if (response?.status !== 201 && response?.status !== 500) {
      return {
        data: {
          user: null,
          msg: response?.data?.msg || null,
        },
        error: response?.data?.msg || "Unknown error.",
        status: response?.status,
      };
    }
    throw new Error(response?.data?.msg || "Unknown error.");
  } catch (error: any) {
    return {
      data: {
        user: null,
        msg: error?.response?.data?.msg || null,
      },
      error: error?.response?.data?.msg || "Unknown error.",
      status: error?.response?.status,
    };
  }
}

export { RegisterApi };
