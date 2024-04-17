import { ProductI } from "../../interfaces/product/card";
import axios, { AxiosResponse } from "axios";
import {
  ProductSearchApiApiReq,
  ProductSearchApiProps,
  ProductSearchApiResponse,
} from "./types";

async function ProductSearchApi({
  search,
  offset,
  limit,
}: ProductSearchApiProps): Promise<ProductSearchApiResponse> {
  const api = process.env.API;
  try {
    if (!search) {
      throw new Error("search parameter is empty or undefined.");
    }
    const response: AxiosResponse<ProductSearchApiApiReq | null> =
      await axios.get(
        `${api}product/search?${search}&offset=${offset || 0}&limit=${
          limit || 100
        }`
      );
    if (
      response?.status === 200 &&
      response?.data?.products &&
      response?.data?.products?.length > 0
    ) {
      return {
        data: {
          filters: response?.data?.filters,
          products: response?.data?.products || [],
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          filters: null,
          products: null,
          msg: response.data ? response.data.msg || null : "Unknown error.",
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
        filters: null,
        products: null,
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}

export { ProductSearchApi };
