import axios, { AxiosResponse } from "axios";
import {
  ProductByIdApiReq,
  ProductByIdProps,
  ProductByIdResponse,
  ProductsByIdsApiReq,
  ProductsByIdsProps,
  ProductsByIdsResponse,
} from "./types";

const api = process.env.API;

async function ProductsByIdsApi({
  ids,
}: ProductsByIdsProps): Promise<ProductsByIdsResponse> {
  try {
    const response: AxiosResponse<ProductsByIdsApiReq | null> = await axios.get(
      `${api}products/${ids}`
    );

    if (response.status === 200 && response.data && response.data.products) {
      return {
        data: {
          products: response.data.products,
          msg: response.data.msg || null,
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

async function ProductByIdApi({
  id,
}: ProductByIdProps): Promise<ProductByIdResponse> {
  try {
    const response: AxiosResponse<ProductByIdApiReq | null> = await axios.get(
      `${api}product/${id}`
    );

    if (response.status === 200) {
      return {
        data: {
          product: response.data ? response.data.product || null : null,
          msg: response.data ? response.data.msg || null : null,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          product: null,
          msg: response.data ? response.data.msg || null : "Unknown error.",
        },
        error: response.data ? response.data.msg || "Unknown error." : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        product: null,
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}

export { ProductsByIdsApi, ProductByIdApi };
