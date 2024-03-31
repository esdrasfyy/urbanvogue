import axios, { AxiosResponse } from "axios";
import { ForgotPassResetReq, ForgotPassResetResponse } from "./types";

async function ForgotPassReset({
  password,
}: {
  password: string;
}): Promise<ForgotPassResetResponse> {
  const api = process.env.API;
  try {
    if (!password) {
      throw new Error("Email or code parameters is empty or undefined.");
    }
    const response: AxiosResponse<ForgotPassResetReq | null> =
      await axios.patch(`${api}forgot-password/reset`, {
        password,
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

export { ForgotPassReset };
