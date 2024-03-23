import axios, { AxiosResponse } from "axios";
import { LoginApiReq, LoginApiResponse, LoginApiProps } from "./types/index";

async function LoginApi({
  credential,
  password,
}: LoginApiProps): Promise<LoginApiResponse> {
  const api = process.env.API;
  try {
    if (!credential || !password) {
      throw new Error("Credentials parameter is empty or undefined.");
    }
    const response: AxiosResponse<LoginApiReq | null> = await axios.post(
      `${api}login/credential`,
      {
        credential: credential || null,
        password: password || null,
      },
      {
        withCredentials: true,
      }
    );
 
    if (response?.status === 200) {
      return {
        data: {
          user: response?.data?.user || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: 200,
      };
    }
    if (response?.status !== 200 && response?.status !== 500) {
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

export { LoginApi };
