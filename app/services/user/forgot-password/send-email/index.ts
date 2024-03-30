import axios, { AxiosResponse } from "axios";
import {
  ForgotPassSendEmailReq,
  ForgotPassSendEmailResponse,
} from "./types/index";

async function ForgotPassSendEmail(
  email: string
): Promise<ForgotPassSendEmailResponse> {
  const api = process.env.API;
  try {
    if (!email) {
      throw new Error("Email parameter is empty or undefined.");
    }
    const response: AxiosResponse<ForgotPassSendEmailReq | null> =
      await axios.get(`${api}forgot-password/${email}`);

    if (response.status === 201) {
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

export { ForgotPassSendEmail };
