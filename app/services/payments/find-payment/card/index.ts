import axios, { AxiosResponse } from "axios";
import {
  FindPaymentCardApiProps,
  FindPaymentCardApiReq,
  FindPaymentCardResponse,
} from "./types";

async function FindPaymentCardApi({
  order_id,
  payment_id,
}: FindPaymentCardApiProps): Promise<FindPaymentCardResponse> {
  const api = process.env.API;
  try {
    const url = `${api}payment/find/card/${order_id}/${payment_id}`;
    const response: AxiosResponse<FindPaymentCardApiReq | null> =
      await axios.get(url);

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
export { FindPaymentCardApi };
