import axios, { AxiosResponse } from "axios";
import {
  PaymentProcessApiProps,
  PaymentProcessApiReq,
  PaymentProcessApiResponse,
} from "./types";

async function PaymentProcessApi({
  payment_method,
  address_id,
  user_id,
  coupon,
  products,
  card_id
}: PaymentProcessApiProps): Promise<PaymentProcessApiResponse> {
  const api = process.env.API;
  try {
    const response: AxiosResponse<PaymentProcessApiReq | null> = await axios.post(
      `${api}payment/${payment_method}`,
      {
        user_id,
        coupon,
        products,
        address_id,
        card_id,
        payment_method
      }
    );

    if (response.status === 201 && response.data && response.data) {
      return {
        data: {
          msg: response.data.msg,
          status: response.status,
          payment_id: response.data.payment_id,
          order_id: response.data.order_id
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          msg: response?.data?.msg || "Unknown error.",
          status: response.status
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
        status: error.response?.status || 500,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { PaymentProcessApi };