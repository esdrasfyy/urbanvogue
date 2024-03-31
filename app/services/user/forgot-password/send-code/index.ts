import axios, { AxiosResponse } from "axios";
import {
  ForgotPassSendCodeReq,
  ForgotPassSendCodeResponse,
} from "./types/index";

async function ForgotPassSendCode({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<ForgotPassSendCodeResponse> {
  const api = process.env.API;
  try {
    if (!email || !code) {
      throw new Error("Email or code parameters is empty or undefined.");
    }
    const response: AxiosResponse<ForgotPassSendCodeReq | null> =
      await axios.get(`${api}forgot-password/verify/${code}/${email}`);

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

export { ForgotPassSendCode };
