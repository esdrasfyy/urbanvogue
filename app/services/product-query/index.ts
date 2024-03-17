import { ProductI } from "../../interfaces/product/card";
import axios, { AxiosResponse } from "axios";
import { ProductQueryApiApiReq, ProductQueryApiProps, ProductQueryApiResponse } from "./types";

async function ProductQueryApi({
  query,
}: ProductQueryApiProps): Promise<ProductQueryApiResponse> {
  const api = process.env.API
  try {
    if (!query) {
      throw new Error("query parameter is empty or undefined.");
    }
    const response: AxiosResponse<ProductQueryApiApiReq | null> = await axios.get(
      `${api}product/filter?${query}`
    ); 

    if (response?.status === 200 && response?.data?.products && response?.data?.products?.length > 0) {
      return {
        data: {
          products: response?.data?.products || [],
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          products: null,
          msg: response.data ? response.data.msg || null : "Unknown error.",
        },
        error: response.data ? response.data.msg || "Unknown error." : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        products: null,
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}

export {ProductQueryApi};