import axios, { AxiosResponse } from "axios";
import {
  FindPaymentPixApiProps,
  FindPaymentPixApiReq,
  FindPaymentPixResponse,
} from "./types";

async function FindPaymentPixApi({
  order_id,
  payment_id,
}: FindPaymentPixApiProps): Promise<FindPaymentPixResponse> {
  const api = process.env.API;
  try {
    const url = `${api}payment/find/pix/${order_id}/${payment_id}`;
    const response: AxiosResponse<FindPaymentPixApiReq | null> = await axios.get(url);
    
    if (response.status === 200 && response.data && response.data) {
      return {
        data: {
          msg: null,
          response: response.data.response,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          msg: response?.data?.msg || "Unknown error.",
          response: null,
        },
        error: response.data
          ? response.data.msg || "Unknown error."
          : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        msg: error.response?.data?.msg || null,
        response: null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { FindPaymentPixApi };
