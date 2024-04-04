import axios, { AxiosResponse } from "axios";
import {
  PaymentPixApiProps,
  PaymentPixApiReq,
  PaymentPixResponse,
} from "./types";

async function PaymentPixApi({
  payment_method,
  address_id,
  user_id,
  coupon,
  products,
}: PaymentPixApiProps): Promise<PaymentPixResponse> {
  const api = process.env.API;
  try {
    const response: AxiosResponse<PaymentPixApiReq | null> = await axios.post(
      `${api}payment/pix`,
      {
        user_id,
        coupon,
        products,
        payment_method,
        address_id,
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
export { PaymentPixApi };
