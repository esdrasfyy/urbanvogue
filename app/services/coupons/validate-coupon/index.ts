import axios, { AxiosResponse } from "axios";
import { ValidadeCouponReq, ValidadeCouponRes } from "./types";

async function ValidadeCoupon(
  code: string,
  ids: number[]
): Promise<ValidadeCouponRes> {
  const api = process.env.API;
  if (!code || !ids) {
    throw new Error("Params of request invalids!");
  }
  try {
    const response: AxiosResponse<ValidadeCouponReq> = await axios.post(
      `${api}coupon/validate/`,
      {
        code,
        ids,
      }
    );
    if (response.status === 200) {
      return { data: response.data, error: null, status: response.status };
    }
    if (response.status !== 200 && response.status !== 500) {
      return { data: null, error: response.data.msg, status: response.status };
    }
    throw new Error(response.data.msg || "Erro desconhecido");
  } catch (error: any) {
    return {
      data: null,
      error: error.response.data.msg || "Erro desconhecido",
      status: error.response.status,
    };
  }
}
export { ValidadeCoupon };
