import axios, { AxiosResponse } from "axios";
import {
  ProductByIdApi,
  ProductByIdProps,
  ProductByIdResponse,
  ProductsByIdsApi,
  ProductsByIdsProps,
  ProductsByIdsResponse,
} from "./types";

const api = process.env.API;

async function ProductsByIdsApi({
  ids,
}: ProductsByIdsProps): Promise<ProductsByIdsResponse> {
  try {
    const response: AxiosResponse<ProductsByIdsApi | null> = await axios.get(
      `${api}products/${ids}`
    );

    if (response.status === 200) {
      return {
        data: {
          products: response?.data?.products || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          products: null,
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
        products: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}
async function ProductByIdApi({
  id,
}: ProductByIdProps): Promise<ProductByIdResponse> {
  try {
    const response: AxiosResponse<ProductByIdApi | null> = await axios.get(
      `${api}product/${id}`
    );

    if (response.status === 200) {
      return {
        data: {
          products: response?.data?.product || null,
          msg: response?.data?.msg || null,
        },
        error: null,
        status: response.status,
      };
    }
    if (response.status !== 200 && response.status !== 500) {
      return {
        data: {
          products: null,
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
        products: null,
        msg: error.response.data.msg || null,
      },
      error: error.response.data.msg || "Unknown error.",
      status: error.response.status,
    };
  }
}

export { ProductsByIdsApi, ProductByIdApi };
